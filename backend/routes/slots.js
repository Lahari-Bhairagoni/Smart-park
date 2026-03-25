const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const slotsFile = path.join(__dirname, "../data/slots.json");

router.get("/", (req, res) => {
  if (!fs.existsSync(slotsFile)) return res.json([]);
  const slots = JSON.parse(fs.readFileSync(slotsFile));
  res.json(slots);
});

module.exports = router;
