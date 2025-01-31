"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Penjualan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Relasi ke tabel Marketing
      Penjualan.belongsTo(models.Marketing, { foreignKey: "marketingId" });
    }
  }
  Penjualan.init(
    {
      transactionNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      marketingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Marketing",
          key: "id",
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      cargoFee: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      grandTotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      remainingBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
    },
    {
      sequelize,
      modelName: "Penjualan",
    }
  );
  return Penjualan;
};
