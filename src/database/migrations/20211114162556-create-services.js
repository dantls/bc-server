'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.createTable('services', { 
      
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      }, 
      device_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'devices',key:'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      battery_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'batteries',key:'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'status',key:'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      
      initial_date:{
        type: Sequelize.DATE,
        // defaultValue: Sequelize.NOW,
        allowNull: true,
      },
      final_date:{
        type: Sequelize.DATE,
        allowNull: true,

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
   
      return queryInterface.dropTable('services');
  
  }
};
