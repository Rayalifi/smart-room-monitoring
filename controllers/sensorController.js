const db = require("../config/db");

const receiveSensorData = (req, res) => {

    const { temperature, humidity } = req.body;

    console.log("========== DATA SENSOR ==========");
    console.log("Temperature :", temperature);
    console.log("Humidity    :", humidity);
    console.log("===============================");

    const sql = `
        INSERT INTO sensor_data
        (temperature, humidity)
        VALUES (?, ?)
    `;

    db.query(sql, [temperature, humidity], (err, result) => {

        if (err) {
            console.error("Database Error:", err);

            return res.status(500).json({
                success: false,
                message: "Gagal menyimpan data"
            });
        }

        res.status(200).json({
            success: true,
            message: "Data berhasil disimpan",
            id: result.insertId
        });

    });

};

// ==========================
// TAMBAHKAN DARI SINI
// ==========================

const getLatestData = (req, res) => {

    const sql = `
        SELECT *
        FROM sensor_data
        ORDER BY created_at DESC
        LIMIT 1
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json(result[0]);

    });

};

const getHistoryData = (req, res) => {

    const sql = `
        SELECT *
        FROM sensor_data
        ORDER BY created_at DESC
        LIMIT 50
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json(result);

    });

};

const getStatistics = (req, res) => {

    const sql = `
        SELECT

            MAX(temperature) AS maxTemperature,
            MIN(temperature) AS minTemperature,
            ROUND(AVG(temperature),2) AS avgTemperature,

            MAX(humidity) AS maxHumidity,
            MIN(humidity) AS minHumidity,
            ROUND(AVG(humidity),2) AS avgHumidity

        FROM sensor_data
    `;

    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json(result[0]);

    });

};

// ==========================
// UBAH BAGIAN INI
// ==========================

module.exports = {

    receiveSensorData,
    getLatestData,
    getHistoryData,
    getStatistics

};