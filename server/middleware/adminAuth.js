const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/BlacklistToken");
const User = require("../models/User");

async function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  console.log("in adminAuth", authHeader);

  if (!authHeader) {
    return res.status(401).json({ err: "Missing token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const isBlacklisted = await BlacklistToken.show(token);
    if (isBlacklisted) {
      return res.status(403).json({ err: "Token was blacklisted" });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, async (err, data) => {
      if (err) {
        return res.status(401).json({ err: "Invalid token" });
      } else {
        console.log("checking authdata", data);
        const user = await User.getOneByEmail(data.username);
        if (!user || user.admin !== data.admin) {
          return res.status(403).json({ err: "Forbidden" });
        }
      }
      next();
    });

    
  } catch (error) {
    res.status(500).json({ err: "Internal server error" });
  }

}

module.exports = adminAuth;