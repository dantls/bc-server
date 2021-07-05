const Brand = require('../models/Brand');

module.exports = {
 
    async index(req,res){      
        
        const{brand_id} = req.params; 

        const {modelos} = await Brand.findByPk(brand_id,{
            include: {association: 'modelos'}
        });

        return res.json(modelos);

    },

};