const Type = require('../models/Type');

module.exports = {
    async store(req,res){
        const{name} = req.body;
        const type = await Type.create({name});

        return res.json(type);

    },
    async index(req,res){
    
        const type = await Type.findAll();

        return res.json(type);

    }

};