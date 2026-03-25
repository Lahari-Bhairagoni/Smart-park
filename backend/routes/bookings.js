const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const bookingsFile = path.join(__dirname, "../data/bookings.json");

router.post("/", (req, res) => {
  let bookings = [];
  if (fs.existsSync(bookingsFile)) {
    bookings = JSON.parse(fs.readFileSync(bookingsFile));
  }
  bookings.push(req.body);
  fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));
  res.json({ message: "Booking successful" });
});

router.get("/", (req, res) => {
  if (!fs.existsSync(bookingsFile)) return res.json([]);
  const bookings = JSON.parse(fs.readFileSync(bookingsFile));
  res.json(bookings);
});

module.exports = router;
