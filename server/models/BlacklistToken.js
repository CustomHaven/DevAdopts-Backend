const db = require("../db/connect");

class BlacklistToken {
    constructor(token) {
        this.token = token.token;
        this.expires_at = token.expires_at;
    }

    static async show(token) {
        const response = await db.query("SELECT * FROM blacklisted_tokens WHERE token = $1;", [token]);
        return response.rows.length > 0;
    }

    static async create(token, expiresAt) {
        if (token === undefined || expiresAt === undefined) {
            throw new Error("Required arguments are missing");
        }
        const existingToken = await db.query("SELECT * FROM blacklisted_tokens WHERE token = $1;", [token]);
        if (existingToken.rows.length === 0) {
            const response = await db.query(`INSERT INTO blacklisted_tokens (token, expires_at) VALUES ($1, $2) RETURNING *;`, [token, expiresAt]);
            return new BlacklistToken(response.rows[0]);
        }
        throw new Error("Token already exist");
    }

    async destroyOldTokens() {
        const response = await db.query(
            "DELETE FROM blacklisted_tokens WHERE expires_at < NOW();"
        );
        if (response.rowCount === 0) {
            return "No expiration tokens found to delete"
        } else {
            return "Number of expiration token deleted: " + String(response.rowCount); 
        }
    }
};

module.exports = BlacklistToken;