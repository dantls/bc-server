const Brand = require('../models/Brand');

module.exports = {
    async store(req,res){
        const{name} = req.body;

        const brand = await Brand.create({name});

        return res.json(brand);

    },
    async index(req,res){
    
       const brand = await Brand.findAll()

       return res.json(brand)

    }

};