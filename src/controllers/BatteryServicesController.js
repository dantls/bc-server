const Battery = require('../models/Battery');
const Status = require('../models/Status');
const Service = require('../models/Service');
const BatteryService = require('../models/BatteryService');
const Device = require('../models/Device');

const {Op , QueryTypes }= require('sequelize');

const db = require('../models')


module.exports = {
    async store(req,res){
        
        const{battery_id} = req.params;

        const statusLoading = await Status.findOne({ where: 
            { name: 'Aguardando' } 
        });
        const statusActive = await Status.findOne({ where: 
            { name: 'Ativo' } 
        });
        const statusCharging= await Status.findOne({ where: 
            { name: 'Carregando' } 
        });
        const statusFim = await Status.findOne({ where: 
            { name: 'Finalizado' } 
        });
        const statusExe = await Status.findOne({ where: 
            { name: 'Execução' } 
        });
        
        if(!statusLoading || !statusCharging || !statusFim || !statusExe || !statusActive){
            return res.status(400).json({error : 'Status não encontrado!'});
        } 
        
        const batteryChanging = await Battery.findOne({ where: 
            { 
                id: {[Op.eq]: battery_id},
                status_id: {[Op.eq]: statusCharging.id},
            } 
        });

        if(batteryChanging){
            return res.status(400).json({error : 'Bateria já está carregando!'});
        }


        const battery = await Battery.findByPk(battery_id);

        if(!battery){
            return res.status(400).json({error : 'Bateria não encontrada!'});
        }

        battery.status_id = statusCharging.id;

        await battery.save();

    
        const serviceDevice = await Service.findOne({ where: 
            { 
                battery_id: {[Op.eq]: battery_id},
                final_date: { [Op.eq]: null  } 
            } 
        });

        if(serviceDevice){

            const deviceLast = await Device.findByPk(serviceDevice.device_id);
            
            if(!deviceLast){
                return res.status(400).json({error : 'Dispositivo não encontrado!'});
            }    

            deviceLast.status_id = statusActive.id;

            deviceLast.save();
    
        }

        await Service.update(
            {
                final_date: new Date(),
                status_id: statusFim.id,
            },
            { 
                where: { 
                    final_date: { [Op.eq]: null  } ,
                    battery_id: {[Op.eq]: battery_id}              
                },    
                    
            },
        );

        const newService = await BatteryService.create({
            battery_id,
            status_id: statusExe.id,
            initial_date: new Date(),
        });

       return res.json(newService);
        

     },

     async index(req,res){                

        // const batteries = await Battery.findAll({
        //     include: [
        //         {association: 'modelos'}, 
        //         {association: 'types'}, 
        //         {association: 'status'},
        //         // {association: 'batteries_service'}
        //     ]
        // });
        // Shop.findAll({
        //     where:{id:shopId}, 
        //     include:[
        //         { model:ShopAd, as:'ads', 
        //           where:{ 
        //                 is_valid:1, 
        //                 is_vertify:1},   
        //           required:false
        //           }
        //         ]
        //      })
        //      .success(function(result) {
        //        callback(result);
        //    });
        // const batteries = await Battery.findAll(
        //         { 
                      
        //             include:[
        //                 {
        //                      model: Service,
        //                      as: "services",
        //                      where:{ 
        //                        final_date: { [Op.eq]: null  },
        //                      },   
        //                     attributes: ['initial_date'],
        //                     required:false
        //                 },
        //                 {
        //                      model: BatteryService,
        //                      as: "battery_services", 
        //                      where:{ 
        //                        final_date: { [Op.eq]: null  },
        //                      },   
        //                     attributes: ['initial_date'],
        //                     required:false
        //                 },
        //                 {
        //                     model: Status,
        //                     as: "status",
        //                     attributes: ['name']
        //                 },
        //             ]      
        //         },
        //     );
        //         console.log(batteries)

        // const batteries = BatteryService.findAll({

        // })
        const batteries = await db.sequelize.query(
        `select distinct 
            bs.id,
            b.code,
            st.name as status , 
            bs.initial_date as initial_date_battery_service ,
            s.initial_date as initial_date_service from batteries b 
                inner join status st on st.id = b.status_id 
                left join services s on b.id = s.battery_id and s.final_date is null
                left join battery_services bs on b.id = bs.battery_id and bs.final_date is null`
        , 
        
        { type: QueryTypes.SELECT });

       
        return res.json(batteries);

    }
}