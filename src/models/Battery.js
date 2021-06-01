const {Model,DataTypes} = require('sequelize');

class Battery extends Model {
    static init(sequelize){
        super.init({
          
              modelo_id:DataTypes.INTEGER,       
              type_id:DataTypes.INTEGER,
              status_id:DataTypes.INTEGER,
              code: DataTypes.STRING, 
              purchase: DataTypes.DATE,       
            
        },{
            sequelize,
            modelName: 'Battery',
            tableName: 'batteries',
        })
    }
    
    static associate(models){
        this.belongsTo(models.Type , { foreignKey: 'type_id', as: 'types'});
        this.belongsTo(models.Modelo , { foreignKey: 'modelo_id', as: 'modelos'});
        this.belongsTo(models.Status , { foreignKey: 'status_id', as: 'status'});
    }
}

module.exports = Battery;