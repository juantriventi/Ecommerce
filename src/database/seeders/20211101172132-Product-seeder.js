'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkInsert('Products', [
       {
        name: 'Nike pegasus 35',
        description: 'Con el Nike pegasus 35, la búsqueda de la velocidad continúa.Sal a la calle con elevaciones de espuma más altas y la comodidad amortiguada combinadas con una parte superior ligera que ofrece sujeción segura.Los detalles intuitivos lo convierten en un básico para los corredores habituales.',
        state: 'disponible',
        price: 1000,
        stock:100,
        image:`Nike Quest.jpg`,
        brandId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nike SB Chron',
        description: 'Con el Nike Quest, la búsqueda de la velocidad continúa.Sal a la calle con elevaciones de espuma más altas y la comodidad amortiguada combinadas con una parte superior ligera que ofrece sujeción segura.Los detalles intuitivos lo convierten en un básico para los corredores habituales.',
        state: 'disponible',
        price: 1000,
        stock:100,
        image:`Nike evolution.jpg`,
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
