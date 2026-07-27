const mysql = require("mysql2");

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