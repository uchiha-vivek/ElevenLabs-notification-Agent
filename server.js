const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { register, httpRequestDurationMiddleware } = require("./metrics/metrics");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

 
app.use(cors());
app.use(bodyParser.json());
app.use(httpRequestDurationMiddleware) 

 
app.use("/api", userRoutes);

 
app.get("/", (req, res) => {
  res.send("User info webhook is running");
});

 
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
