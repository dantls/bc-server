const Battery = require('../models/Battery');
const Status = require('../models/Status');
const Service = require('../models/Service');
const Device = require('../models/Device');

const BatteryService = require('../models/BatteryService');

const {Op}= require('sequelize');


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
}