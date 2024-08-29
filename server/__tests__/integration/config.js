const db = require("../../db/connect");  // Use the same db connection
const fs = require("fs");
const path = require("path");

const pathJoin = path.join(__dirname + "/reset.sql");

// Load the SQL file
const resetSQL = fs.readFileSync(pathJoin).toString();

// Function to reset the test database
const resetTestDB = async () => {
    try {
        await db.query(resetSQL);
        // console.log("Database reset successfully");
    } catch (err) {
        console.error("Could not reset TestDB:", err.message);
        throw err;
    }
};

module.exports = { resetTestDB };