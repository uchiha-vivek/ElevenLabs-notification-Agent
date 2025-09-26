const express = require("express");
const router = express.Router();
const axios = require("axios");
const nodemailer = require('nodemailer')

const { isValidEmail, isValidPhone } = require("../utils/validators");
const { userCounter, errorCounter } = require("../metrics/metrics");

let users = []


const SLACK_WEBHOOK_URL="https://hooks.slack.com/services/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"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",   
  port: 587,
  secure: false,             
  auth: {
    user: process.env.EMAIL_USER,  
    pass: process.env.EMAIL_PASS,  
  },
});

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

    try {
    await transporter.sendMail({
      from: `"User Notifier" <${process.env.EMAIL_USER}>`,
      to: "recipient@example.com", // change to your notification recipient
      subject: "📢 New User Collected",
      text: `A new user has been collected:\n\nUsername: ${newUser.username}\nEmail: ${newUser.useremail}\nPhone: ${newUser.phone}\nTime: ${newUser.timestamp}`,
      html: `<h3>📢 New User Collected</h3>
             <p><b>Username:</b> ${newUser.username}</p>
             <p><b>Email:</b> ${newUser.useremail}</p>
             <p><b>Phone:</b> ${newUser.phone}</p>
             <p><b>Time:</b> ${newUser.timestamp}</p>`,
    });
    console.log("✅ Email notification sent");
  } catch (err) {
    console.error("❌ Failed to send email notification", err.message);
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
