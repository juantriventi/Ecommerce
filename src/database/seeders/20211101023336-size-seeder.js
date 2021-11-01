'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Sizes', [{
      name: 'large',
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      name: 'medium',
      createdAt: new Date(),
      updatedAt: new Date()
      
    },{
      name: 'small',
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
