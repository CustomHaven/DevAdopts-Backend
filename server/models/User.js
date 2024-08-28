const db = require("../db/connect");

class User {
  constructor({
    user_id,
    first_name,
    last_name,
    email,
    username,
    password,
    post_code,
    admin,
  }) {
    this.id = user_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.username = username;
    this.password = password;
    this.post_code = post_code;
    this.admin = admin;
  }
  static async getOneByUsername(username) {
    const response = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async create(data) {
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      post_code,
      admin,
    } = data;
    let response = await db.query(
      "INSERT INTO users (first_name, last_name, email, username, password, post_code, admin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
      [first_name, last_name, email, username, password, post_code, admin]
    );
    if (response.rows.length !== 1) {
      throw new Error(" Result entry already exists.");
    }
    return new User(response.rows[0]);
  }
}

module.exports = User;
