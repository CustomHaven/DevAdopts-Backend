const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/BlacklistToken");

async function authenticator(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const blacklist = await BlacklistToken.show(token);
    if (blacklist) {
      return res.status(403).json({ err: "Token was blacklisted" });
    } else {
      jwt.verify(token, process.env.SECRET_TOKEN, async (err, data) => {
        if (err) {
          return res.status(401).json({ err: "Invalid token" });
        } else {
          next();
        }
      });
    }
  } else {
    return res.status(401).json({ err: "Missing token" });
  }
}

module.exports = authenticator;


/*
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
*/