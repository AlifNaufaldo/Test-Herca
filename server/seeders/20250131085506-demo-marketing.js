'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Marketings", [
      { name: "Alfandy", createdAt: new Date(), updatedAt: new Date() },
      { name: "Mery", createdAt: new Date(), updatedAt: new Date() },
      { name: "Danang", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Marketings", null, {});
  },
};
