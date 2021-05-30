const {Model,DataTypes} = require('sequelize');

class Status extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            
        },{
            sequelize
        })
    }
    static associate(models){
        this.hasMany(models.Device , { foreignKey: 'status_id', as: 'devicesType'});
        this.hasMany(models.Battery , { foreignKey: 'status_id', as: 'batteriesType'});

    }

}

module.exports = Status;