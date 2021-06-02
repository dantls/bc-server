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

        const status = await Status.findOne({ where: 
            { name: 'Execução' } 
        });
        
        if(!status){
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

        const service = await Service.update(
            {
                final_date: new Date()
            },
            { 
                where: { 
                    final_date: { [Op.eq]: null  } ,
                    device_id: {[Op.eq]: device_id},
                    battery_id: {[Op.eq]: battery_id}              
                },    
                    
            },
        );

      
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
        if(!service[0]){
            const newService = await Service.create({
                device_id,
                battery_id,
                status_id: status.id,
                initial_date: new Date(),
            });
            return res.json(newService);
        }

        return res.json(service);
        

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