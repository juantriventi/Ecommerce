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
          {
            firstName: "Mauro",
            lastName: "Calvo",
            userName: "Mauro",
            email: "Mauro@gmail.com",
            street: "Av. Siempre Viva",
            number: 123,
            city: "Capital Federal",
            state: "Bs As",
            floor: 3,
            apartment:"B",
            cp:"1408",
            phone_number:1122334455,
            password:hashPassword("Hola!1234"), 
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            firstName: "Pedro",
            lastName: "Baron",
            userName: "Pedro",
            email: "Pedro@gmail.com",
            street: "Av. Siempre Viva",
            number: 123,
            city: "Capital Federal",
            state: "Bs As",
            floor: 3,
            apartment:"B",
            cp:"1408",
            phone_number:1122334455,
            password:hashPassword("Chau!1234"), 
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            firstName: "Jose",
            lastName: "Esteban",
            userName: "Jose",
            email: "Jose@gmail.com",
            street: "Av. Siempre Viva",
            number: 123,
            city: "Capital Federal",
            state: "Bs As",
            floor: 3,
            apartment:"B",
            cp:"1408",
            phone_number:1122334455,
            password:hashPassword("Bien!1234"), 
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            firstName: "Grego",
            lastName: "Roselo",
            userName: "Grego",
            email: "Grego@gmail.com",
            street: "Av. Siempre Viva",
            number: 123,
            city: "Capital Federal",
            state: "Bs As",
            floor: 3,
            apartment:"B",
            cp:"1408",
            phone_number:1122334455,
            password:hashPassword("Grego!1234"), 
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
