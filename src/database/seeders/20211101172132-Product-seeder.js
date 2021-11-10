'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkInsert('Products', [
       {
        name: 'Nike pegasus 35',
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
        name: 'Nike SB Chron',
        description: 'zapatillas para hacer spining',
        state: 'disponible',
        price: 1000,
        stock:100,
        image:`1631052256021_img.jpg`,
        brandId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nike SB',
        description: 'zapatillas de skate',
        state: 'disponible',
        price: 1990,
        stock:100,
        image:`Force017.jpg`,
        brandId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nike Air max',
        description: 'zapatillas deportivas',
        state: 'disponible',
        price: 1500,
        stock:100,
        image:`ZapatillasNikeZoom.jpg`,
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
