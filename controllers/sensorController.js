const receiveSensorData = (req, res) => {

    const { temperature, humidity } = req.body;

    console.log("========== DATA SENSOR ==========");
    console.log("Temperature :", temperature);
    console.log("Humidity    :", humidity);
    console.log("===============================");

    res.status(200).json({
        success: true,
        message: "Data sensor diterima"
    });

};

module.exports = {
    receiveSensorData
};