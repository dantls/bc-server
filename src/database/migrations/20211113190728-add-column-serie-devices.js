'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn(
      'devices',
      'serie',
      {
        type: Sequelize.STRING,
      },
      
    );
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn(
      'devices',
      'serie',
      
      
    );
  },
};
