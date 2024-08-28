const jwt = require("jsonwebtoken");

function authenticator(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, data) => {
      if (err) {
        res.status(401).json({ err: "Invalid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ err: "Missing token" });
  }
}

module.exports = authenticator;
