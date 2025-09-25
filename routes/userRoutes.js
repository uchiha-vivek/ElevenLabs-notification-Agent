const express = require("express");
const router = express.Router();
const axios = require("axios");

const { isValidEmail, isValidPhone } = require("../utils/validators");
const { userCounter, errorCounter } = require("../metrics/metrics");

let users = []


const SLACK_WEBHOOK_URL = "";



router.post("/save-user", async (req, res) => {
  const { username, useremail, phone } = req.body;

  if (!username || !useremail || !phone) {
    errorCounter.inc();
    return res.status(400).json({
      error: "username, useremail, and phone are required",
    });
  }

  if (!isValidEmail(useremail)) {
    errorCounter.inc();
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (!isValidPhone(phone)) {
    errorCounter.inc();
    return res.status(400).json({ error: "Invalid phone number format" });
  }

  const newUser = {
    username,
    useremail,
    phone,
    timestamp: new Date().toISOString(),
  };

  users.push(newUser);
  userCounter.inc();

  console.log("✅ Received user info:", newUser);

  // Send Slack notification
  if (SLACK_WEBHOOK_URL) {
    try {
      await axios.post(SLACK_WEBHOOK_URL, {
        text: `📢 *New User Collected!*
- Username: ${newUser.username}
- Email: ${newUser.useremail}
- Phone: ${newUser.phone}
- Time: ${newUser.timestamp}`,
      });
      console.log("✅ Sent notification to Slack");
    } catch (err) {
      console.error("❌ Failed to send Slack notification", err.message);
    }
  }

  res.json({
    success: true,
    message: "User info received successfully",
    data: newUser,
  });
});

// Fetch all users
router.get("/users", (req, res) => {
  res.json({
    count: users.length,
    data: users,
  });
});

module.exports = router;
