'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkInsert('Products', [
       {
        name: 'max Air',
        description: 'zapatillas para volar',
        state: 'disponible',
        price: 1000,
        stock:100,
        image:`1635446758971_img.jpg`,
        brandId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'power troter',
        description: 'zapatillas para hacer spining',
        state: 'disponible',
        price: 1000,
        stock:100,
        image:`1635446758971_img.jpg`,
        brandId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkDelete('People', null, {});
    
  }
};
