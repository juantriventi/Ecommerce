'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Categories', [{
      name: 'Niños',
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      name: 'Adultos',
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
