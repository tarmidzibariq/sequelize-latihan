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
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id:"22dc7a19-85d2-4fa0-9011-087dba7105ad",
          fullName: "admin",
          email: "admin@wegodev.com",
          role:"SuperAdmin",
          password: bcrypt.hashSync("password", 10),
          status:"Active",
          avatar:null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:"22dc7a19-85d2-4fa0-9011-081231231",
          fullName: "user",
          email: "user@wegodev.com",
          role:"Creator",
          password: bcrypt.hashSync("password", 10),
          status: "Active",
          avatar:null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    
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
