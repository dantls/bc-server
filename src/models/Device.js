const {Model,DataTypes} = require('sequelize');

class Device extends Model {
    static init(sequelize){
        super.init({
          
              modelo_id:DataTypes.INTEGER,       
              type_id:DataTypes.INTEGER,
              code: DataTypes.STRING, 
              serie: DataTypes.STRING, 
              purchase: DataTypes.DATE,       
            
        },{
            sequelize
        })
    }
    
    static associate(models){
        this.belongsTo(models.Type , { foreignKey: 'type_id', as: 'types'});
        this.belongsTo(models.Modelo , { foreignKey: 'modelo_id', as: 'modelos'});
    }
}

module.exports = Device;