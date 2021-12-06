'use strict';
var faker = require('faker')

const orders = [...Array(10)].map( (order) => (
    {
      product_id: Math.floor(Math.random() * 10) + 1,
      user_id: Math.floor(Math.random() * 10) + 1,
      qty: Math.floor(Math.random() * 20) + 1,
      price: parseInt(faker.finance.amount(1, 100, 0)),
      transaction_status: 'WAITING',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
))

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
     await queryInterface.bulkInsert('Orders', orders, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Orders', null, {})
  }
};
