import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async store(req,res){

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6)
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Dados incorretos.'})
        }

        const{email, admin ,name, password} = req.body;

        if(!email){
            return res.status(400).json({error : 'E-mail não informado'});
        }

        const userExists = await User.findOne({
            where:{email}
        });

        if(userExists){
            return res.status(400).json({error : 'Usuário já cadastrado.!'});
        }

        const user = await User.create({name,email,password, admin});

        delete user.password
        delete user.password_hash

        return res.json(user);

    }
    async index(req,res){
    
        const user = await User.findAll();

        return res.json(user);
    }
    async update(req,res){

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => 
                oldPassword ? field.required() : field
            ),
            confirmPassword: Yup.string().when('password', (password, field) => 
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Dados incorretos.'})
        }

   
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