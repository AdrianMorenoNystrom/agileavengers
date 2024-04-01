import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LoadingContext from '../../components/functions/LoadingContext'

function WeatherWidget({ lat, lon }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const url = `/api/weather?lat=${lat}&lon=${lon}`;

    const fetchWeatherFromServer = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Failed to fetch weather data from server:", error);
      }
    };

    fetchWeatherFromServer();
  }, [lat, lon]);

  if (!weather || !weather.main || !weather.weather) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}> <LoadingContext/></Box>;
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <Card sx={{ minWidth: 275, m: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          {new Date(weather.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" component="div">
            {weather.name}, {weather.sys.country}
          </Typography>
          <img src={iconUrl} alt="Weather icon" style={{ width: "50px" }} />
        </Box>
        <Typography variant="h6" component="div">
          {weather.main.temp.toFixed(1)}°C
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Feels like {weather.main.feels_like.toFixed(1)}°C. {weather.weather[0].description}
        </Typography>
        <Typography variant="body2">
          Wind: {weather.wind.speed}m/s {windDirection(weather.wind.deg)}
          <br />
          Humidity: {weather.main.humidity}%
          <br />
          Visibility: {weather.visibility ? (weather.visibility / 1000).toFixed(1) : 'N/A'}km
        </Typography>
      </CardContent>
    </Card>
  );
}

function windDirection(degrees) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(((degrees %= 360) < 0 ? degrees + 360 : degrees) / 45) % 8;
  return directions[index];
}

export default WeatherWidget;
