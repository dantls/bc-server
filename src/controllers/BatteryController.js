const Modelo = require('../models/Modelo');
const Device = require('../models/Device');
const Type = require('../models/Type');
const Battery = require('../models/Battery');
const Status = require('../models/Status');

module.exports = {
    async store(req,res){
        
        const{code,purchase,type_id,modelo_id,status_id} = req.body;
             
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

        const battery = await Battery.create({code,purchase,type_id,status_id,modelo_id});

        return res.json(battery);

    },
    async index(req,res){                

        const batteries = await Battery.findAll({
            include: [
                {association: 'modelos'}, 
                {association: 'types'}, 
                {association: 'status'}
            ]
        });

        return res.json(batteries);

    },
    // async update(req,res){

    //     const{id} = req.params; 

     
    //     const { 
    //         code,
    //         purchase,
    //         type_id,
    //         status_id,
    //         modelo_id,
    //         serie
    //     } = req.body;

    //     const type = await Type.findByPk(type_id);

    //     if(!type){
    //         return res.status(400).json({error : 'Tipo não encontrada!'});
    //     }

    //     const status = await Status.findByPk(status_id);

    //     if(!status){
    //         return res.status(400).json({error : 'Status não encontrado!'});
    //     }

    //     const modelo = await Modelo.findByPk(modelo_id);

    //     if(!modelo){
    //         return res.status(400).json({error : 'Modelo não encontrado!'});
    //     }
        
    //    const [updateDevice] = await Device.update({
    //         code,
    //         purchase,
    //         type_id,
    //         status_id,
    //         modelo_id,
    //         serie
    //     }, {
    //      where: {
    //          id
    //      }
    //    });
    //    if (!updateDevice){
    //        res.error(404)
    //    }

    //    const device = await  Device.findByPk(id,
    //     {
    //         include: [
    //             {association: 'modelos'}, 
    //             {association: 'types'}, 
    //             {association: 'status'}
    //         [           
    //     })

    //    return res.json(device)
    // },

};