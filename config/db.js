console.log("========== ENV ==========");
console.log("MYSQLHOST:", process.env.MYSQLHOST);
console.log("MYSQLPORT:", process.env.MYSQLPORT);
console.log("MYSQLDATABASE:", process.env.MYSQLDATABASE);
console.log("MYSQLUSER:", process.env.MYSQLUSER);
console.log("MYSQLPASSWORD:", process.env.MYSQLPASSWORD ? "******" : "undefined");
console.log("=========================");

const mysql = require("mysql2");

console.log("MYSQLHOST =", process.env.MYSQLHOST);
console.log("MYSQLUSER =", process.env.MYSQLUSER);
console.log("MYSQLDATABASE =", process.env.MYSQLDATABASE);
console.log("MYSQLPORT =", process.env.MYSQLPORT);

const db = mysql.createConnection({
    host: process.env.MYSQLHOST || "localhost",
    user: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || "",
    database: process.env.MYSQLDATABASE || "smart_room_monitoring",
    port: process.env.MYSQLPORT || 3306
});

db.connect((err) => {

    if (err) {
        console.error("❌ Koneksi Database Gagal");
        console.error(err);
        return;
    }

    console.log("✅ MySQL Connected");

});

module.exports = db;