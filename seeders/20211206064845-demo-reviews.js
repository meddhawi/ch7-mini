'use strict';
var faker = require('faker')

const reviews = [...Array(10)].map( (review) => (
    {
        // product_id: Math.floor(Math.random() * 10) + 1,
        product_id: faker.datatype.number({
          'min': 1,
          'max': 10
        }),
        rating: Math.floor(Math.random() * 5) + 1,
        review: faker.lorem.paragraph(),
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
     await queryInterface.bulkInsert('Reviews', reviews, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Reviews', null, {})
  }
};
