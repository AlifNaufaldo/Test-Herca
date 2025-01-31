'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Penjualans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transactionNumber: {
        type: Sequelize.STRING
      },
      marketingId: {
        type: Sequelize.INTEGER,
        allowNull: false,  
        references: {
          model: 'Marketings', 
          key: 'id',          
        },
        onDelete: 'CASCADE',   
      },
      date: {
        type: Sequelize.DATE
      },
      cargoFee: {
        type: Sequelize.INTEGER
      },
      totalBalance: {
        type: Sequelize.INTEGER
      },
      grandTotal: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Penjualans');
  }
};