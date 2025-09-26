const client = require("prom-client")


const register = new client.Registry()


client.collectDefaultMetrics({ register })


const userCounter = new client.Counter({
  name: "collected_users_total",
  help: "Total number of users collected",
})

const errorCounter = new client.Counter({
  name: "errors_total",
  help: "Total number of errors encountered",
})

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 3, 5],
})


register.registerMetric(userCounter);
register.registerMetric(errorCounter);
register.registerMetric(httpRequestDuration);


const httpRequestDurationMiddleware = (req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on("finish", () => {
    end({ method: req.method, route: req.path, status: res.statusCode });
  });
  next();
};

module.exports = {
  register,
  userCounter,
  errorCounter,
  httpRequestDurationMiddleware,
};
