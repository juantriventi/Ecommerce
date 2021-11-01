'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
      await queryInterface.bulkInsert('Products', [{
    
        name: 'Producto1',
        stock: 10,
        description: "descripcion 1",
        price: 10000,
        brandId: 1,
        categoryId: 1 ,
        sizeId: 1 ,
        colorId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
        
      },{
        name: 'Producto2',
        stock: 5,
        description: "descripcion 2",
        price: 30000,
        brandId: 2,
        categoryId: 2 ,
        sizeId: 2 ,
        colorId: 2 ,
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
