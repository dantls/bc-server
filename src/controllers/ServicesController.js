const Device = require('../models/Device');
const Battery = require('../models/Battery');
const Status = require('../models/Status');

const Service = require('../models/Service');


module.exports = {
    async store(req,res){

        
        const{device_id,battery_id, status_id} = req.body;
             
        const device = await Device.findByPk(device_id);
        const battery = await Battery.findByPk(battery_id);
        const status = await Status.findByPk(status_id);


        if(!device){
            return res.status(400).json({error : 'Modelo não encontrado!'});
        }
        if(!battery){
            return res.status(400).json({error : 'Tipo de equipamento não encontrado!'});
        }
        if(!status){
            return res.status(400).json({error : 'Status não encontrado!'});
        }   
  
        const init_date = new Date();
        const service = await Service.create({device_id,battery_id,status_id, init_date});

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