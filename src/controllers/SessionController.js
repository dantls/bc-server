const {Op} = require('sequelize');

const User = require('../models/User');

module.exports = {
    async store(req,res){
       const{email,password} = req.body;

       let user = await User.findOne({where: {email,password}});

       if(!user){
           return res.status(200).json({error: 'Usuário/Senha incorretos.'});
       }   
       return res.json(user);
    }
};