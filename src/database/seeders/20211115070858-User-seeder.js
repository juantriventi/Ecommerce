'use strict';

const { hashPassword } = require("../../../services/users");

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
      await queryInterface.bulkInsert(
        "Users",
        [
          {
            firstName: "Andres",
            lastName: "Fernandez",
            userName: "Andres",
            email: "Andres@gmail.com",
            street: "Av. Siempre Viva",
            number: 123,
            city: "Capital Federal",
            state: "Bs As",
            floor: 3,
            apartment:"B",
            cp:"1408",
            phone_number:1122334455,
            password:hashPassword("123456"), 
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
