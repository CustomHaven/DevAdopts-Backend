require("dotenv").config();
const fs = require("fs");
const path = require("path");

const db = require("./connect");
console.log("waht is __dirname?", __dirname)
const pathJoin = path.join(__dirname, '../../database/setup.sql');

console.log("The path join fix", pathJoin); // Outputs the absolute path to setup.sql
const sql = fs.readFileSync(pathJoin).toString();


db.query(sql)
    .then(() => {
        db.end();
        console.log("Set-up complete");
    })
    .catch(err => console.log(err));