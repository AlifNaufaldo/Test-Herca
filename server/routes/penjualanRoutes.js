const express = require('express');
const router = express.Router();
const penjualanController = require('../controllers/penjualanController');

router.get('/', penjualanController.getAllPenjualan);
router.get('/transaksi', penjualanController.getAllTransaksi);

module.exports = router;
