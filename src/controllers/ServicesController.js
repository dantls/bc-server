const Device = require('../models/Device');
const Battery = require('../models/Battery');
const Status = require('../models/Status');

const Service = require('../models/Service');
const sequelize = require('sequelize');
const {Op}= require('sequelize');

module.exports = {
    async store(req,res){
        
        const{battery_id,device_id} = req.body;
        // const{battery_id} = req.params;

        const statusExe = await Status.findOne({ where: 
            { name: 'Execução' } 
        });
        const statusFim = await Status.findOne({ where: 
            { name: 'Finalizado' } 
        });
        
        if(!statusExe){
            return res.status(400).json({error : 'Status não encontrado!'});
        } 
        if(!statusFim){
            return res.status(400).json({error : 'Status não encontrado!'});
        } 
        
        const battery = await Battery.findByPk(battery_id);

        if(!battery){
            return res.status(400).json({error : 'Bateria não encontrada!'});
        }

        const device = await Device.findByPk(device_id);
        
        if(!device){
            return res.status(400).json({error : 'Equipamento não encontrado!'});
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

        const services = await Service.findAll({
            include: [
                {association: 'devices'}, 
                {association: 'batteries'}, 
                {association: 'status'}
            ]
        });

       
        return res.json(services);

    }

};