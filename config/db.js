const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "smart_room_monitoring"
});

db.connect((err) => {

    if (err) {
        console.error("Koneksi Database Gagal");
        console.error(err);
        return;
    }

    console.log("✅ MySQL Connected");

});

module.exports = db;