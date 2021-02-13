"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Supermercado",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Farmacia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Restaurants",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tarjeta de Credito",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Alquiler",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Otros",
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
    await queryInterface.bulkDelete("categories", null, {});
  },
};
