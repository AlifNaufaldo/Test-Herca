const express = require('express');
const router = express.Router();
const penjualanController = require('../controllers/penjualanController');

router.get('/', penjualanController.getAllPenjualan);

module.exports = router;
