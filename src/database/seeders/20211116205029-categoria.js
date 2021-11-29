'use strict';



module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkInsert(
      "categoria",
      [
        {
          categoria: "Hombre", 
          createdAt: new Date(), 
          updatedAt: new Date(), 
        },
        {
          categoria: "Mujer", 
          createdAt: new Date(), 
          updatedAt: new Date(), 
        },

        {
          categoria: "Niños", 
          createdAt: new Date(), 
          updatedAt: new Date(), 
        },

        
       
      ],
      {}
    );

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
