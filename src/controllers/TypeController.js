const Type = require('../models/Type');

module.exports = {
    async store(req,res){
        const{name} = req.body;
        const type = await Type.create({name});

        return res.json(type);

    },
    async show(req,res){
    
        const{id} = req.params 

        const type = await Type.findByPk(id);

        return res.json(type);

    },


    async index(req,res){
    
        const type = await Type.findAll()
 
        return res.json(type)
 
     },
    async delete(req,res){
    
        const {id} = req.params
        
        await Type.destroy({
         where: {
           id
         }
        });
        
 
        return res.json({"message": "Ok"})
     },
     async update(req,res){
     
        const {id, name} = req.body
        
        await Type.update({ name }, {
         where: {
             id
         }
       });
        
 
        return res.json({id, name})
     }

};