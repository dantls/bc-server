const {Model,DataTypes} = require('sequelize');

class BatteryService extends Model {
    static init(sequelize){
        super.init({
              battery_id: DataTypes.INTEGER,
              status_id: DataTypes.INTEGER,
              initial_date: DataTypes.DATE,           
              final_date: DataTypes.DATE            
        },{
            sequelize
        })
    }
    
    static associate(models){
        this.belongsTo(models.Battery , { foreignKey: 'battery_id', as: 'batteries'});
        this.belongsTo(models.Status , { foreignKey: 'status_id', as: 'status'} );
    }
}

module.exports = BatteryService;