const Brand = require('../models/Brand');

module.exports = {
    async store(req,res){
        const{name} = req.body;

        const brand = await Brand.create({name});

        return res.json(brand);

    },
    async show(req,res){
        const{id} = req.params    
    
    
       const brand = await Brand.findByPk(id)

       return res.json(brand)

    },
    async index(req,res){
    
       const brand = await Brand.findAll()

       return res.json(brand)

    },
    async delete(req,res){
    
       const {id} = req.params
       
       await Brand.destroy({
        where: {
          id
        }
       });
       

       return res.json({"message": "Ok"})
    },
    async update(req,res){
    
       const {id, name} = req.body
       
       await Brand.update({ name }, {
        where: {
            id
        }
      });
       

       return res.json({id, name})
    }

};