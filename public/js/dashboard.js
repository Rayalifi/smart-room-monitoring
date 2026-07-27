let chart;

async function loadLatestData() {

    try {

        const response = await fetch("/api/sensor/latest");
        const data = await response.json();

        document.getElementById("temperature").innerHTML =
            data.temperature + " °C";

        document.getElementById("humidity").innerHTML =
            data.humidity + " %";
        
        const temperature = data.temperature;
        const humidity = data.humidity;

        let status = "";
        let score = 100;
        let recommendation = "";

        if (temperature >= 22 && temperature <= 28 &&
            humidity >= 40 && humidity <= 60){

            status = "🟢 Comfortable";
            score = 95;
            recommendation = "Room conditions are ideal.";

        }

        else if (temperature > 28 && humidity > 60){

            status = "🔴 Hot & Humid";
            score = 45;
            recommendation = "Turn on AC and improve ventilation.";

        }

        else if (temperature > 28){

            status = "🟡 Hot";
            score = 70;
            recommendation = "Turn on a fan or open the window.";

        }

        else if (temperature < 22){

            status = "🔵 Cold";
            score = 70;
            recommendation = "Close the window or increase room temperature.";

        }

        else if (humidity > 60){

            status = "🟡 Humid";
            score = 72;
            recommendation = "Improve ventilation or use a dehumidifier.";

        }

        else if (humidity < 40){

            status = "🟠 Dry";
            score = 72;
            recommendation = "Use a humidifier or place a bowl of water indoors.";

        }

        else{

            status = "🟢 Normal";
            score = 85;
            recommendation = "Room conditions are acceptable.";

        }

        document.getElementById("roomStatus").innerHTML = status;

        document.getElementById("comfortScore").innerHTML =
        score + " / 100";

        document.getElementById("recommendation").innerHTML =
        recommendation;
            
    } catch (err) {

        console.log(err);

    }

}

async function loadHistory() {

    try {

        const response = await fetch("/api/sensor/history");

        const data = await response.json();

        const table = document.getElementById("historyTable");

        table.innerHTML = "";

        data.forEach(item => {

            table.innerHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.temperature} °C</td>
                    <td>${item.humidity} %</td>
                    <td>${new Date(item.created_at).toLocaleTimeString()}</td>
                </tr>
            `;

        });

    } catch(err){

        console.log(err);

    }

}

async function loadStatistics() {

    try {

        const response = await fetch("/api/sensor/statistics");

        const data = await response.json();

        document.getElementById("maxTemp").innerHTML =
            data.maxTemperature + " °C";

        document.getElementById("minTemp").innerHTML =
            data.minTemperature + " °C";

        document.getElementById("avgTemp").innerHTML =
            data.avgTemperature + " °C";

        document.getElementById("maxHum").innerHTML =
            data.maxHumidity + " %";

        document.getElementById("minHum").innerHTML =
            data.minHumidity + " %";

        document.getElementById("avgHum").innerHTML =
            data.avgHumidity + " %";

    } catch(err){

        console.log(err);

    }

}

async function loadChart() {

    try {

        const response = await fetch("/api/sensor/history");

        const data = await response.json();

        const labels = data
            .slice()
            .reverse()
            .map(item =>
                new Date(item.created_at).toLocaleTimeString()
            );

        const temperatures = data
            .slice()
            .reverse()
            .map(item => item.temperature);

        const humidity = data
            .slice()
            .reverse()
            .map(item => item.humidity);

        if (chart) {

            chart.destroy();

        }

        const ctx = document
            .getElementById("sensorChart");

        chart = new Chart(ctx, {

            type: "line",

            data: {

                labels,

                datasets: [

                    {

                        label: "Temperature (°C)",

                        data: temperatures,

                        borderWidth: 3,

                        tension: .3

                    },

                    {

                        label: "Humidity (%)",

                        data: humidity,

                        borderWidth: 3,

                        tension: .3

                    }

                ]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        position: "top"

                    }

                }

            }

        });

    } catch (err) {

        console.log(err);

    }

}

loadLatestData();
loadChart();
loadHistory();
loadStatistics();

setInterval(() => {

    loadLatestData();
    loadChart();
    loadHistory();
    loadStatistics();

},5000);