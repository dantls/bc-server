const Status = require('../models/Status');

module.exports = {
    async store(req,res){
        const{name} = req.body;
        const status = await Status.create({name});

        return res.json(status);

    },
    async index(req,res){
    
        const status = await Status.findAll();

        return res.json(status);

    }

};