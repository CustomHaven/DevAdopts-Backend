const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

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
    const user = await User.getOneByEmail(data.email);

    const match = await bcrypt.compare(data.password, user.password);

    if (match) {
      const payload = { username: user.email, userId: user.id };
      const sendToken = (err, token) => {
        if (err) {
          throw new Error("Error in token generation");
        }
        res.status(200).json({
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

module.exports = {
  register,
  login,
  show,
  destroy
};
