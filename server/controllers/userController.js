const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/BlacklistToken");

const User = require("../models/User");

async function logout(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
      const blackList = await BlacklistToken.create(token, expiresAt);
      await blackList.destroyOldTokens();
    }
    res.status(200).json({ success: true, message: "Logged out successfully. Please remove the token from your client-side storage." });
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
}

async function register(req, res) {
  try {
    const data = req.body;

    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

    data.password = await bcrypt.hash(data.password, salt);
    const result = await User.create(data);

    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  const data = req.body;
  try {
    console.log("INSIDE", req.body)
    const user = await User.getOneByEmail(data.email);

    console.log("USER M", user)

    const match = await bcrypt.compare(data.password, user.password);

    if (match) {
      const payload = { username: user.email, userId: user.id, admin: user.admin };
      const sendToken = (err, token) => {
        if (err) {
          throw new Error("Error in token generation");
        }
        res.status(200).json({
          user_id: user.user_id,
          success: true,
          token: token,
        });
      };

      jwt.sign(
        payload,
        process.env.SECRET_TOKEN,
        { expiresIn: "2 days" },
        sendToken
      );
    } else {
      throw new Error("User could not be authenticated");
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

async function show(req, res) {
  try {
    const id = req.params.id;
    const user = await User.show(parseInt(id));
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function destroy(req, res) {
  try {
    const id = req.params.id;
    const user = await User.show(parseInt(id));
    await user.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function createAdmin(req, res) {
  try {
    const data = req.body;

    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

    data.password = await bcrypt.hash(data.password, salt);
    const result = await User.createAdmin(data);

    res.status(201).send(result);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  logout,
  register,
  login,
  show,
  destroy,
  createAdmin
};
