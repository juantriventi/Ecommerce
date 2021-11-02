'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('Products','brandId',Sequelize.INTEGER);
    await queryInterface.addConstraint('Products', {
      fields: ['brandId'],
      type: 'foreign key',
      name: 'fk_product_brand',
      references: { 
        table: 'Brands',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('Products','brandId');
    const dropForeignKeySQL = queryInterface.QueryGenerator.dropForeignKeyQuery("Products", "brandId");
    await queryInterface.sequelize.query(dropForeignKeySQL);
  }
};
