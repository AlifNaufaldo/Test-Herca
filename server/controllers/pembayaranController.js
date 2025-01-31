const { Pembayaran, Penjualan } = require("../models");

const createPayment = async (req, res) => {
  try {
    const { penjualanId, amountPaid, paymentDate } = req.body;

    // Cari data penjualan berdasarkan ID
    const penjualan = await Penjualan.findByPk(penjualanId);
    if (!penjualan) {
      return res.status(404).json({ success: false, message: "Penjualan tidak ditemukan" });
    }

    // Hitung sisa saldo
    const remainingBalance = penjualan.grandTotal - amountPaid;
    const paymentStatus = remainingBalance === 0 ? "paid" : "unpaid";

    // Simpan pembayaran
    const pembayaran = await Pembayaran.create({
      penjualanId,
      amountPaid,
      paymentDate,
      remainingBalance,
      paymentStatus,
    });

    res.status(201).json({
      success: true,
      message: "Pembayaran berhasil dibuat",
      data: pembayaran,
    });
  } catch (error) {
    console.log("🚀 ~ createPayment ~ error:", error)
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Pembayaran.findAll({ include: { model: Penjualan } });
    res.json({ success: true, data: payments });
  } catch (error) {
    console.log("🚀 ~ getAllPayments ~ error:", error)
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Pembayaran.findByPk(id, { include: { model: Penjualan } });

    if (!payment) {
      return res.status(404).json({ success: false, message: "Pembayaran tidak ditemukan" });
    }

    res.json({ success: true, data: payment });
  } catch (error) {
    console.log("🚀 ~ getPaymentById ~ error:", error)
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    const payment = await Pembayaran.findByPk(id);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Pembayaran tidak ditemukan" });
    }

    await payment.update({ paymentStatus });
    res.json({ success: true, message: "Status pembayaran diperbarui", data: payment });
  } catch (error) {
    console.log("🚀 ~ updatePaymentStatus ~ error:", error)
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
    console.log("🚀 ~ deletePayment ~ error:", error)
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createPayment, getAllPayments, getPaymentById, updatePaymentStatus, deletePayment };
