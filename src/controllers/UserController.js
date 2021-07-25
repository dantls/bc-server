import User from '../models/User';

class UserController {
    async store(req,res){
        const{email} = req.body;

        if(!email){
            return res.status(400).json({error : 'E-mail não informado'});
        }

        const userExists = await User.findOne({
            where:{email}
        });

        if(userExists){
            return res.status(400).json({error : 'Usuário já cadastrado.!'});
        }

        const {
            id,
            name,
            admin
        } = await User.create({name,email,password, admin});

        return res.json({
            id,
            name,
            email,
            admin
        });

    }
    async index(req,res){
    
        const user = await User.findAll();

        return res.json(user);
    }
    async update(req,res){

   
        const{email, oldPassword} = req.body;

        const user = await User.findByPk(req.userID)

        if(email && email !== user.email){

            const userExists = await User.findOne({
                where:{email}
            });

            if(userExists){
                return res.status(400).json({error : 'Usuário já cadastrado.!'});
            }

        }

        if(oldPassword && !(await user.checkPassword(String(oldPassword)))){
            return res.status(401).json({error: 'Senha não confere'})
        }
       

        const {id, name, admin} = await user.update(req.body);

        return res.json({
            id,
            name,
            email,
            admin
        });
    }
   
}

export default new UserController();