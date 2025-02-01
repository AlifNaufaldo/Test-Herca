const { Pembayaran, Penjualan } = require("../models");

const createPayment = async (req, res) => {
  try {
    const { transactionNumber, amountPaid, paymentDate } = req.body;

    // Cari transaksi berdasarkan transactionNumber
    const penjualan = await Penjualan.findOne({ where: { transactionNumber } });
    if (!penjualan) {
      return res.status(404).json({ success: false, message: "Penjualan tidak ditemukan" });
    }

    // Pastikan sisa saldo masih ada
    if (penjualan.remainingBalance === 0) {
      return res.status(400).json({ success: false, message: "Tagihan sudah lunas" });
    }

    // Pastikan jumlah pembayaran tidak lebih dari sisa saldo
    if (amountPaid > penjualan.remainingBalance) {
      return res.status(400).json({ success: false, message: "Jumlah pembayaran melebihi sisa tagihan" });
    }

    // Hitung sisa saldo setelah pembayaran
    const newRemainingBalance = penjualan.remainingBalance - amountPaid;
    const paymentStatus = newRemainingBalance === 0 ? "paid" : "unpaid";

    // Simpan pembayaran ke tabel Pembayaran
    const pembayaran = await Pembayaran.create({
      penjualanId: penjualan.id,
      amountPaid,
      paymentDate,
      remainingBalance: newRemainingBalance,
      paymentStatus,
    });

    // Update remainingBalance di tabel Penjualan
    await penjualan.update({ remainingBalance: newRemainingBalance });

    res.status(201).json({
      success: true,
      message: "Pembayaran berhasil",
      data: pembayaran,
    });
  } catch (error) {
    console.log("🚀 ~ createPayment ~ error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Pembayaran.findAll({
      include: [
        {
          model: Penjualan,
          attributes: [
            "transactionNumber",  
            "grandTotal",
            "remainingBalance",
          ],
        },
      ],
    });
    res.json({ success: true, data: payments });
  } catch (error) {
    console.error("Error during fetching payments: ", error);  
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Pembayaran.findByPk(id, {
      include: { model: Penjualan, attributes: ["grandTotal", "remainingBalance"] },
    });

    if (!payment) {
      return res.status(404).json({ success: false, message: "Pembayaran tidak ditemukan" });
    }

    res.json({ success: true, data: payment });
  } catch (error) {
    console.log("🚀 ~ getPaymentById ~ error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updatePaymentAmount = async (req, res) => {
  try {
    const { id } = req.params;
    const { amountPaid } = req.body; 

    const payment = await Pembayaran.findByPk(id);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Pembayaran tidak ditemukan" });
    }

    // Update amountPaid
    await payment.update({ amountPaid });
    res.json({ success: true, message: "Jumlah pembayaran diperbarui", data: payment });
  } catch (error) {
    console.log("🚀 ~ updatePaymentAmount ~ error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Pembayaran.findByPk(id);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Pembayaran tidak ditemukan" });
    }

    await payment.destroy();
    res.json({ success: true, message: "Pembayaran berhasil dihapus" });
  } catch (error) {
    console.log("🚀 ~ deletePayment ~ error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createPayment, getAllPayments, getPaymentById, updatePaymentAmount, deletePayment };
