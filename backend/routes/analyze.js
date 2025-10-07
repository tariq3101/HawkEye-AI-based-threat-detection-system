const express = require("express");
const router = express.Router();
const axios = require("axios");

// Dashboard Analysis
router.get("/dashboard", async (req, res) => {
  try {
    const response = await axios.get("http://127.0.0.1:8001/analyze/dashboard");
    res.json(response.data);
  } catch (err) {
    console.error("Python service error:", err.message);
    res.status(500).json({ error: "Python ML service unavailable" });
  }
});

// User Activity Analysis
router.get("/useractivity", async (req, res) => {
  try {
    const response = await axios.get("http://127.0.0.1:8001/analyze/useractivity");
    res.json(response.data); // This will be consumed by UserActivity.tsx
  } catch (err) {
    console.error("Python service error:", err.message);
    res.status(500).json({ error: "Python ML service unavailable" });
  }
});

module.exports = router;
