const {Model,DataTypes} = require('sequelize');

class Modelo extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            
        },{
            sequelize
        })
    }
    
    static associate(models){
        this.belongsTo(models.Brand , { foreignKey: 'brand_id', as: 'brand'});
        this.hasMany(models.Device , { foreignKey: 'modelo_id', as: 'devicesModelo'});
    
      
    }
}

module.exports = Modelo;