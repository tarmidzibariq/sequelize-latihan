'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const users = [];
     for (let i = 0; i < 3; i++) {
       users.push({
         id:faker.string.uuid(),
         fullName: faker.person.fullName(),
         role: faker.helpers.arrayElement(['SuperAdmin', 'Creator']),
         email: faker.internet.email(),
         password: faker.internet.password(),
         status: faker.helpers.arrayElement(['Active', 'Suspend']),
         avatar: null,
         createdAt: new Date(),
         updatedAt: new Date(),
       });
     }
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
