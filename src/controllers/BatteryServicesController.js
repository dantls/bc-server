const Battery = require('../models/Battery');
const Status = require('../models/Status');
const Service = require('../models/Service');

const BatteryService = require('../models/BatteryService');

const {Op}= require('sequelize');


module.exports = {
    async store(req,res){
        
        const{battery_id} = req.params;

        const statusLoading = await Status.findOne({ where: 
            { name: 'Aguardando' } 
        });
        const statusCharging= await Status.findOne({ where: 
            { name: 'Carregando' } 
        });
        const statusFim = await Status.findOne({ where: 
            { name: 'Finalizado' } 
        });
        
        if(!statusLoading || !statusCharging || !statusFim){
            return res.status(400).json({error : 'Status não encontrado!'});
        } 
        
        const battery = await Battery.findByPk(battery_id);

        battery.status_id = statusCharging.id;

        await battery.save();

        if(!battery){
            return res.status(400).json({error : 'Bateria não encontrada!'});
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
            status_id: statusLoading.id,
            initial_date: new Date(),
        });

       return res.json(newService);
        

     },
    

}