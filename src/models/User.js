import {Model,DataTypes} from 'sequelize';

import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            admin: DataTypes.BOOLEAN,
            password: DataTypes.VIRTUAL,
            password_hash: DataTypes.STRING,
        },{
            sequelize
        });

        this.addHook('beforeSave', async ( user ) => {
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });

        return this;
    }

    checkPassword(password){
        return bcrypt.compare(password, this.password_hash)
    }

    
}

module.exports = User;