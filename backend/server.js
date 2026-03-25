const express = require("express");


const authRoutes = require("./routes/auth");
const slotRoutes = require("./routes/slots");
const bookingRoutes = require("./routes/bookings");
const paymentRoutes = require("./routes/payments");

const app = express();
const PORT = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// base test
app.get("/", (req, res) => {
  res.send("Smart Parking Backend is running");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
