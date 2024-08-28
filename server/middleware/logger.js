const logger = (req, res, next) => {
  console.log(req.method, req.originalUrl);
  console.log(req.body);
  next();
};

module.exports = logger;
