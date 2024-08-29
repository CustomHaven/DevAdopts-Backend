require("dotenv").config();
const { Pool } = require("pg");

let pool;

const createPool = () => {
    if (process.env.NODE_ENV === "test") {
        if (!process.env.DB_TEST_URL) {
            throw new Error("DB_TEST_URL is not set or is invalid");
        }
        return new Pool({
            connectionString: process.env.DB_TEST_URL,
        });
    }

    const option = process.env.NODE_ENV === "production" ? {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 5432
    } : {
        connectionString: process.env.DB_URL 
    };
    
    return new Pool(option);
};

const getDBInstance = () => {
    if (!pool) {
        pool = createPool();
        // console.log("Database pool created");
    }
    return pool;
};

module.exports = getDBInstance();