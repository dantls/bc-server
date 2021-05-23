'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.createTable('modelos', { 
      
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      }, 
      brand_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'brands',key:'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
    
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },

    });
  
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.dropTable('modelos');
  
  }
};
