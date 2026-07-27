const express = require("express");
const router = express.Router();

const {

    receiveSensorData,
    getLatestData,
    getHistoryData,
    getStatistics

} = require("../controllers/sensorController");

router.post("/", receiveSensorData);

router.get("/latest", getLatestData);

router.get("/history", getHistoryData);

router.get("/statistics", getStatistics);

module.exports = router;