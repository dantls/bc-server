const Modelo = require('../models/Modelo');
const Brand = require('../models/Brand');

module.exports = {
    async store(req,res){

        const{name,brand_id} = req.body;
             
        const brand = await Brand.findByPk(brand_id);

        if(!brand){
            return res.status(400).json({error : 'Marca não encontrada!'});
        }


        const modelo = await Modelo.create({name,
            brand_id
        
        });

        return res.json(modelo);

    },
    async index(req,res){

        const{brand_id} = req.params;            

        const {modelos} = await Brand.findByPk(brand_id,{
            include: {association: 'modelos'}
        });

       
        return res.json(modelos);

    },
    async show(req,res){

        const{brand_id} = req.params;            

        const {modelos} = await Brand.findByPk(brand_id,{
            include: {association: 'modelos'}
        });

       
        return res.json(modelos);

    },
    

};