require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const penjualanRoutes = require("./routes/penjualanRoutes");
const marketingRoutes = require("./routes/marketing");
const pembayaranRoutes = require("./routes/pembayaranRoutes")

// routes
app.use("/penjualan", penjualanRoutes);
app.use("/marketing", marketingRoutes);
app.use("/pembayaran", pembayaranRoutes)

// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
