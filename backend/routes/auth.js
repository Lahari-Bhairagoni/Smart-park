const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const usersFile = path.join(__dirname, "../data/users.json");

// ================= REGISTER =================
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ message: "All fields required" });
  }

  let users = [];
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile));
  }

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.json({ message: "User already exists" });
  }

  users.push({ email, password });

  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.json({ message: "Registered successfully" });
});


// ================= LOGIN =================
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ message: "All fields required" });
  }

  if (!fs.existsSync(usersFile)) {
    return res.json({ message: "No users found" });
  }

  const users = JSON.parse(fs.readFileSync(usersFile));

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    user: { email: user.email }
  });
});

module.exports = router;