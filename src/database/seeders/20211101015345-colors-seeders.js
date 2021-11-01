'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Colors', [{
    name: 'Azul',
    createdAt: new Date(),
    updatedAt: new Date()
    
  },{
    name: 'Rojo',
    createdAt: new Date(),
    updatedAt: new Date()
    
  } 
  ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
