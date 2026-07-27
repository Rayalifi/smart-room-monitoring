const express = require("express");
const cors = require("cors");
const path = require("path");

require("./config/db");

const sensorRoutes = require("./routes/sensorRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//    res.send("Smart Room Monitoring API");
//});

app.use("/api/sensor", sensorRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
    console.log("=================================");
    console.log("Server Running");
    console.log("http://localhost:3000");
    console.log("=================================");
});