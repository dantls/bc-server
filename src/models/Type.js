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
        this.hasMany(models.Battery , { foreignKey: 'type_id', as: 'batteriesType'});

    }

}

module.exports = Type;