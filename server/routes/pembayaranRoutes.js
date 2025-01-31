const express = require("express");
const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentStatus,
  deletePayment,
} = require("../controllers/pembayaranController");

const router = express.Router();

router.post("/", createPayment);
router.get("/", getAllPayments);
router.get("/:id", getPaymentById);
router.put("/:id", updatePaymentStatus);
router.delete("/:id", deletePayment);

module.exports = router;
