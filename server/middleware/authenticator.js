const jwt = require("jsonwebtoken");

function authenticator(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(" ")[1];
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
