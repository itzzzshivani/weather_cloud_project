const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.static("public"));

app.get("/weather", async (req, res) => {
  const city = req.query.city || "Delhi";

  const API = "https://api.open-meteo.com/v1/forecast?latitude=28.6&longitude=77.2&current_weather=true";

  try {
    const response = await axios.get(API);
    res.json({
      city: city,
      temperature: response.data.current_weather.temperature,
      wind: response.data.current_weather.windspeed
    });
  } catch (err) {
    res.json({ error: "Unable to fetch weather" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
