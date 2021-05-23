const {Model,DataTypes} = require('sequelize');

class Type extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            
        },{
            sequelize
        })
    }
    static associate(models){
        this.hasMany(models.Device , { foreignKey: 'type_id', as: 'devicesType'});

    }

}

module.exports = Type;