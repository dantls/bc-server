const {Model,DataTypes} = require('sequelize');

class Brand extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            
        },{
            sequelize
        })
    }
    static associate(models){
        this.hasMany(models.Modelo , { foreignKey: 'brand_id', as: 'modelos'});

    }
}

module.exports = Brand;