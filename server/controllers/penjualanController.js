const { Penjualan, Marketing } = require('../models');

const getAllPenjualan = async (req, res) => {
  try {
    const penjualans = await Penjualan.findAll({
      include: [{
        model: Marketing,
        as: 'Marketing' 
      }]
    });
    res.json(penjualans);
  } catch (error) {
    console.log("🚀 ~ getAllPenjualan ~ error:", error)
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getAllPenjualan };
