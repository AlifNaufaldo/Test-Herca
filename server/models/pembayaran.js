"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pembayaran extends Model {
    static associate(models) {
      Pembayaran.belongsTo(models.Penjualan, { foreignKey: "penjualanId" });
    }
  }
  Pembayaran.init(
    {
      penjualanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Penjualans",
          key: "id",
        },
      },
      amountPaid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      remainingBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Pembayaran",
    }
  );
  return Pembayaran;
};
