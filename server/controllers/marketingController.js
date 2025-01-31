const { calculateCommission } = require("../helpers/comission");
const { Marketing, Penjualan, sequelize } = require("../models");

const getMarketingCommissions = async (req, res) => {
  try {
    const results = await Penjualan.findAll({
      attributes: [
        "marketingId",
        [sequelize.fn("DATE_TRUNC", "month", sequelize.col("date")), "month"],
        [sequelize.fn("SUM", sequelize.col("grandTotal")), "totalOmzet"],
      ],
      include: [
        {
          model: Marketing,
          attributes: ["id", "name"],
        },
      ],
      group: ["marketingId", "month", "Marketing.id", "Marketing.name"],
      raw: true,
      nest: true,
    });

    // Format hasil untuk komisi
    const formattedResults = results.map((item) => {
        //format ke number
      const totalOmzet = Number(item.totalOmzet);
      const commissionPercentage = calculateCommission(totalOmzet);
      const commissionNominal = (commissionPercentage / 100) * totalOmzet;

      let month = null;
      if (item.month) {
        // Jika month berupa objek Date, ubah menjadi string
        // Format menjadi YYYY-MM
        month = new Date(item.month).toISOString().slice(0, 7); 
      }

      return {
        marketing: item.Marketing.name,
        month,
        omzet: totalOmzet,
        commissionPercentage,
        commissionNominal,
      };
    });

    res.json({
      success: true,
      data: formattedResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { getMarketingCommissions };
