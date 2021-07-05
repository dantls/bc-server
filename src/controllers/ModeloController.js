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
    async update(req,res){

        const{id} = req.params; 

     
        const { name, brand_id } = req.body;

        const brand = await Brand.findByPk(brand_id);

        if(!brand){
            return res.status(400).json({error : 'Marca não encontrada!'});
        }
        
       const [updateModelo] = await Modelo.update({ name , brand_id }, {
         where: {
             id
         }
       });
       if (!updateModelo){
           res.error(404)
       }

       const modelo = await  Modelo.findByPk(id,
        {
            include: [
                {
                    association: 'brand'
                },
                {
                    model: Brand,
                    as: "brand",
                    attributes: ['id','name'],
                }, 

            ] 
        })

       return res.json(modelo)
    },
    async show(req,res){

        const{id} = req.params;       


        const modelo = await  Modelo.findByPk(id,
            {
                include: [
                    {
                        association: 'brand'
                    },
                    {
                        model: Brand,
                        as: "brand",
                        attributes: ['id','name'],
                        // where: {
                        //     id: battery_id
                        // },
                    }, 

                ] 
            })
        

       
        return res.json(modelo);

    },
    async index(req,res){         

        const modelos = await Modelo.findAll({
            include: [
                {
                    association: 'brand'
                },
                {
                    model: Brand,
                    as: "brand",
                    attributes: ['id','name'],
                    // where: {
                    //     id: battery_id
                    // },
                }, 

            ] 
        });

       
        return res.json(modelos);

    },
    async delete(req,res){
    
        const {id} = req.params
        
        await Modelo.destroy({
         where: {
           id
         }
        });
        
        return res.json({"message": "Ok"})
    },
    

};