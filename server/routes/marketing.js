const express = require("express");
const router = express.Router();
const { getMarketingCommissions } = require("../controllers/marketingController");

// Endpoint comission marketing
router.get("/", getMarketingCommissions);
router.get("/commission", getMarketingCommissions);

module.exports = router;
