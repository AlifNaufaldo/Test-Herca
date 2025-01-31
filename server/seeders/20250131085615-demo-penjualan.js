"use strict";
const fs = require("fs");
const path = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataPath = path.join(__dirname, "../data/penjualan.json");
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8")).penjualans;

    // Insert data penjualans ke dalam tabel Penjualans
    await queryInterface.bulkInsert(
      "Penjualans",
      data.map((item) => ({
        transactionNumber: item.transaction_number,
        marketingId: item.marketingId,
        date: item.date,
        cargoFee: item.cargo_fee,
        totalBalance: item.total_balance,
        grandTotal: item.grand_total,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    // Hapus semua data dari tabel Penjualans
    await queryInterface.bulkDelete("Penjualans", null, {});
  },
};
