'use strict';

var faker = require('faker')

const products = [...Array(10)].map( (product) => (
  {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: Math.floor(Math.random() * 100),
    price: parseInt(faker.finance.amount(1, 100, 0)),
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
   await queryInterface.bulkInsert('Products', products, {})
  }, 

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {})
  }
};
