const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { register, httpRequestDurationMiddleware } = require("./metrics/metrics");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(httpRequestDurationMiddleware); // track request durations

// Routes
app.use("/api", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("User info webhook is running ✅");
});

// Prometheus metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
