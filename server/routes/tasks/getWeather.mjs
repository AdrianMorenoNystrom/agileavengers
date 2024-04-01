import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get('/api/weather', async (req, res) => {
  const { lat, lon } = req.query;
  
  const API_KEY = process.env.REACT_APP_LocalWeather;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).send("Error fetching weather data");
  }
});

export default router;
