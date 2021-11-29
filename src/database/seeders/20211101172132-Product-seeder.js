'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkInsert('Products', [
       {
        name: 'Nike pegasus 35',
        description: 'Zapatillas para volar',
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
        description: 'Ojotas color rojo',
        state: 'disponible',
        price: 1000,
        stock:100,
        image:`1635446785025_img.jpg`,
        brandId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nike SB',
        description: 'Zapatillas de skate',
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
        description: 'Zapatillas deportivas',
        state: 'disponible',
        price: 1500,
        stock:100,
        image:`ZapatillasNikeZoom.jpg`,
        brandId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nike Superfly 8 Academy Fg',
        description: 'Los Nike Mercurial Superfly 8 Academy MG proporcionan una gran velocidad y una tracción especializada para realizar recortes rápidos y frenadas bruscas.La textura adherente de la parte superior ofrece un control preciso del balón, y la zona del tobillo elástica se adapta al tobillo para crear un ajuste perfecto que se adapta a tus movimientos.',
        state: 'disponible',
        price: 15000,
        stock:100,
        image:`botin-home.jpg`,
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
