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
    
        const statusCharging= await Status.findOne({ where: 
            { name: 'Carregando' } 
        });
        const statusFim = await Status.findOne({ where: 
            { name: 'Finalizado' } 
        });
       
        const statusChargeFinished = await Status.findOne({ where: 
            { name: 'Carregada' } 
        });
        
        if(!statusChargeFinished 
            || !statusCharging || !statusChargeFinished || !statusFim ){
            return res.status(400).json({error : 'Status não encontrado!'});
        } 
        
        const battery = await Battery.findByPk(battery_id);

        if(!battery){
            return res.status(400).json({error : 'Bateria não encontrada!'});
        }


        const batteryChanging = await Battery.findOne({ where: 
            { 
                id: {[Op.eq]: battery_id},
                status_id: {[Op.eq]: statusCharging.id},
            } 
        });

        if(!batteryChanging){
            return res.status(400).json({error : 'Status de Bateria inválido!'});
        }

        battery.status_id = statusChargeFinished.id;

        await battery.save();

        await BatteryService.update(
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

       const updatedBattery = await Battery.findByPk(battery_id);

       return res.json(updatedBattery);
        

     },

}