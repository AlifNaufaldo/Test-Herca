const express = require("express");
const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentAmount,
  deletePayment,
} = require("../controllers/pembayaranController");

const router = express.Router();

router.post("/", createPayment);
router.get("/", getAllPayments);
router.get("/:id", getPaymentById);
router.put("/:id", updatePaymentAmount);
router.delete("/:id", deletePayment);

module.exports = router;
