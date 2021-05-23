'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.createTable('devices', { 
      
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      }, 
      modelo_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'modelos',key:'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      type_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'types',key:'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      
      code:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      purchase:{
        type: Sequelize.DATE,
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
   
      return queryInterface.dropTable('devices');
  
  }
};
