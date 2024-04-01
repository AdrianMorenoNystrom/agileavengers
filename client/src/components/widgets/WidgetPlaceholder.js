import React, { useState, useEffect } from 'react';
import { Popover, Typography, Box, IconButton, Grid } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import WidgetsIcon from '@mui/icons-material/WidgetsRounded';
import WeatherWidget from './WeatherWidget';
import "./widgetplaceholder.scss";

function WidgetPlaceholder() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [widgetSelected, setWidgetSelected] = useState(false);
  const [userPosition, setUserPosition] = useState({ lat: null, lon: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserPosition({ lat: position.coords.latitude, lon: position.coords.longitude });
    }, (error) => {
      console.error("Error getting location: ", error);
    });
  }, []);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const addWeatherWidget = () => {
    setWidgetSelected(true);
    handlePopoverClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'widget-popover' : undefined;

  return (
    <Box className='widgetPlaceholder'>
      {!widgetSelected && (
        <Typography sx={{ mb: 1, color: '#b0b0b0' }}>Widget</Typography>
      )}
      {!widgetSelected ? (
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
          <WidgetsIcon className="widgets-icon" sx={{ fontSize: 60 }} aria-describedby={id} color="action" onClick={handlePopoverOpen} />
          </Grid>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box sx={{ p: 2 }}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography onClick={handlePopoverClose}>Add Weather Widget</Typography>
                </Grid>
                <Grid item>
                  <IconButton aria-label="add" onClick={addWeatherWidget}>
                    <AddRoundedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          </Popover>
        </Grid>
      ) : (
        userPosition.lat && <WeatherWidget lat={userPosition.lat} lon={userPosition.lon} />
      )}
    </Box>
  );
}

export default WidgetPlaceholder;
