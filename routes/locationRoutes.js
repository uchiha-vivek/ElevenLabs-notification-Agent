const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");


router.get("/locations", (req, res) => {
  try {
    const filePath = path.join(__dirname, "../data/locations.json");
    const locationsData = fs.readFileSync(filePath, "utf-8");
    const locations = JSON.parse(locationsData);

    res.json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (err) {
    console.error("Error reading locations.json:", err);
    res.status(500).json({ success: false, error: "Failed to load locations" });
  }
});

module.exports = router;
