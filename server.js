const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { register, httpRequestDurationMiddleware } = require("./metrics/metrics");
const userRoutes = require("./routes/userRoutes");
const locationRoutes = require('./routes/locationRoutes')

const app = express();
const PORT = process.env.PORT || 5000;

 
app.use(cors());
app.use(bodyParser.json());
app.use(httpRequestDurationMiddleware) 
app.use("/api", userRoutes);
app.use("/api",locationRoutes)
 
app.get("/", (req, res) => {
  res.send("User info webhook is running");
});

 
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
