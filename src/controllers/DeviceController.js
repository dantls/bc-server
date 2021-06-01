const Modelo = require('../models/Modelo');
const Type = require('../models/Type');
const Device = require('../models/Device');
const Status = require('../models/Status');

module.exports = {
    async store(req,res){

        
        const{code,purchase,type_id,status_id,modelo_id,serie} = req.body;
             

        const modelo = await Modelo.findByPk(modelo_id);
        const status = await Status.findByPk(status_id);
        const type = await Type.findByPk(type_id);

        if(!modelo){
            return res.status(400).json({error : 'Modelo não encontrado!'});
        }
        if(!type){
            return res.status(400).json({error : 'Tipo de equipamento não encontrado!'});
        }
        if(!status){
            return res.status(400).json({error : 'Status não encontrado!'});
        }       

        const device = await Device.create({code,purchase,type_id,modelo_id,status_id,serie});

        return res.json(device);

    },
    async index(req,res){                

        const devices = await Device.findAll({
            include: [
                {association: 'modelos'}, 
                {association: 'types'}, 
                {association: 'status'}
            ]
        });

       
        return res.json(devices);

    }

};