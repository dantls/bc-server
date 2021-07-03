const Status = require('../models/Status');

module.exports = {
    async store(req,res){
        const{name} = req.body;
        const status = await Status.create({name});

        return res.json(status);

    },
    async index(req,res){
    
        const{id} = req.body 

        const status = await Status.findByPk(id);

        return res.json(status);

    },


    async show(req,res){
    
        const status = await Status.findAll()
 
        return res.json(status)
 
     },
    async delete(req,res){
    
        const {id} = req.params
        
        await Status.destroy({
         where: {
           id
         }
        });
        
 
        return res.json({"message": "Ok"})
     },
     async update(req,res){
     
        const {id, name} = req.body
        
        await Status.update({ name }, {
         where: {
             id
         }
       });
        
 
        return res.json({id, name})
     }
 


};