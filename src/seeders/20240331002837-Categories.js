'use strict';

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
    await queryInterface.bulkInsert('Categories', [
      {
        id: "22dc7a19-85d2-4fa0-9011-087dba710533", // Only if your database doesn't auto-generate UUIDs for bulk inserts
        title: 'Kebakaran',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: "22dc7a19-85d2-4fa0-9011-087dba713333", // Only if your database doesn't auto-generate UUIDs for bulk inserts
        title: 'Gempa',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      
    ], {}
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
