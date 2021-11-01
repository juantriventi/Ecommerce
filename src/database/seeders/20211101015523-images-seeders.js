'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('Images', [{
   
        name: 'https://fakeimg.pl/350x200/?text=Imagen_producto',
        createdAt: new Date(),
        updatedAt: new Date()
        
      },{
        name: 'https://fakeimg.pl/350x200/?text=Imagen_producto',
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
