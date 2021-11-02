'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
     await queryInterface.bulkInsert('Brands', [
      {
        name: 'Nike',
        image: `1635446758971_img.jpg`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Adidas',
        image: `1635446758971_img.jpg`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('People', null, {});
    
  }
};
