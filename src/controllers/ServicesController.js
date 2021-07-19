const Device = require('../models/Device');
const Battery = require('../models/Battery');
const Status = require('../models/Status');

const Service = require('../models/Service');
const {Op}= require('sequelize');

module.exports = {
    async store(req,res){
        
        const{battery_id,device_id} = req.body;

        const statusExe = await Status.findOne({ where: 
            { name: 'Execução' } 
        });
        const statusUso = await Status.findOne({ where: 
            { name: 'Em uso' } 
        });
        const statusFim = await Status.findOne({ where: 
            { name: 'Finalizado' } 
        });
        const statusLoading = await Status.findOne({ where: 
            { name: 'Aguardando' } 
        });
             
        if(!statusExe || !statusFim || !statusLoading || !statusUso){
            return res.status(400).json({error : `Status não encontrado!`});
        } 
        
        const battery = await Battery.findByPk(battery_id);

        if(!battery){
            return res.status(400).json({error : 'Bateria não encontrada!'});
        }

        const [updateBattery] = await Battery.update({
            ...battery,
            status_id:statusUso.id,
        }, {
         where: {
             id:battery_id,
             status_id: { [Op.ne]:  statusLoading.id },
         }
       });

       if (!updateBattery){
          return res.status(404).json({error : 'Bateria não encontrado | Status inválido!'});
       }


        const device = await Device.findByPk(device_id);
        
        if(!device){
            return res.status(400).json({error : 'Equipamento não encontrado!'});
        }


        const service = await Service.findOne({ where: 
            { 
                device_id: {[Op.eq]: device_id},
                final_date: { [Op.eq]: null  } 
            } 
        });

        if(service){

            const batteryLast = await Battery.findByPk(service.battery_id);
            
            if(!batteryLast){
                return res.status(400).json({error : 'Bateria não encontrado!'});
            }    

            batteryLast.status_id = statusLoading.id;

            batteryLast.save();
        }
        
        //New Service

        await Service.update(
            {
                final_date: new Date(),
                status_id: statusFim.id,
            },
            { 
                where: { 
                    final_date: { [Op.eq]: null  } ,
                    [Op.or]: [ 
                        {battery_id: {[Op.eq]: battery_id}}, 
                        {device_id: {[Op.eq]: device_id}}, 
                    ],              
                },    
                    
            },
        );

        


        const newService = await Service.create({
                    device_id,
                    battery_id,
                    status_id: statusExe.id,
                    initial_date: new Date(),
        });
      
        // const service = await Service.findAll(
        //     { 
        //         where: { final_date: { [Op.eq]: null  } },    
        //         attributes:['id', 'initial_date', 'final_date'],       
        //         include:[
        //             {
        //                 model: Battery,
        //                 as: "batteries",
        //                 where: {
        //                     id: battery_id
        //                 },
        //                 attributes: ['code']
        //             },
        //             {
        //                 model: Device,
        //                 as: "devices",
        //                 where: {
        //                     id: device_id
        //                 },
        //                 attributes: ['code']
        //             }
        //         ]      
        //     },
        // );

        // const service = await sequelize.query(
        //     `SELECT * FROM batteries 
        //         inner join WHERE 
        //         status = :status`,
        //     {
        //       replacements: { status: 'active' },
        //       type: QueryTypes.SELECT
        //     }
        // );
        // if(!service[0]){
        //     const newService = await Service.create({
        //         device_id,
        //         battery_id,
        //         status_id: statusExe.id,
        //         initial_date: new Date(),
        //     });
        //     return res.json(newService);
        // }

        return res.json(newService);
        

    },
    async index(req,res){                

        // const services = await Service.findAll({
        //     include: [
        //         {association: 'devices'}, 
        //         {association: 'batteries'}, 
        //         {association: 'status'}
        //     ]
        // });

        const statusExe = await Status.findOne({ where: 
            { name: 'Execução' } 
        });
   
        if(!statusExe){
            return res.status(400).json({error : 'Status não encontrado!'});
        } 
 
   
        const services = await Service.findAll(
                { 
                    where: { 
                        final_date: { [Op.eq]: null  },
                        status_id: statusExe.id
                    
                    },    
                    // attributes:['id', 'initial_date', 'final_date'],       
                    include:[
                        {
                            model: Battery,
                            as: "batteries",
                            attributes: ['code']
                        },
                        {
                            model: Device,
                            as: "devices",
                            attributes: ['code']
                        },
                        {
                            model: Status,
                            as: "status",
                            attributes: ['name']
                        },
                    ]      
                },
            );

       
        return res.json(services);

    }

};