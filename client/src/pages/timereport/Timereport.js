import React, { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import useFetchData from "../../components/UseFetchData";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AlertMessage from "../../components/AlertMessage";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { Container, Stack, Chip, Button } from "@mui/material";
import statusCheck from '../../components/functions/statusCheck'; 


export default function Timereport() {
  const [projectId, setProjectId] = useState("");
  const [date, setDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [hours, setHours] = useState(null);
  const [note, setNote] = useState("");
  const [alertMessage, setAlertMessage] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  const resetUserInput = () => {
    setProjectId("");
    setDate(null);
    setFromTime(null);
    setToTime(null);
    setHours(null);
    setSelectedCategory("");
    setNote("");
  };

  useEffect(() => {
    if (fromTime && toTime) {
      const differenceInMinutes = toTime.diff(fromTime, "minute");
      const hours = Math.floor(differenceInMinutes / 60);
      const minutes = differenceInMinutes % 60;
      let decimalTime = hours + minutes / 60;
      decimalTime = parseFloat(decimalTime.toFixed(2));
      setHours(decimalTime);
    } else {
      setHours(null);
    }
  }, [fromTime, toTime]);

  const { data, isLoading, error } = useFetchData("/api/projects/user-specific");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/tasks');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const categories = result.message;
        setAllCategories(categories);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error}</div>;

  const isFormInvalid = () => {
    if (
      projectId === "" ||
      date === null ||
      fromTime === null ||
      toTime === null ||
      hours === null ||
      hours <= 0 ||
      selectedCategory === ""

    ) {
      const alertMessage = {
        severity: "error",
        message:
          "Failed to submit form! Please fill out all fields and ensure your work hours are accurate.",
      };
      setAlertMessage(alertMessage);

      return true;
    }

    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormInvalid()) return;

    try {
      const response = await fetch(
        "api/timereports/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId,
            date: date,
            hours: hours,
            note: note,
            category: selectedCategory
          }),
          credentials: "include",
        }
      );

      const alertMessage = handleResponse(response.status);
      setAlertMessage(alertMessage);

      if (response.status === 200) {
        resetUserInput();
      }
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const handleResponse = (status) => {
    if (status === 200) {
      return {
        severity: "success",
        message: "Your time report has successfully been submitted!",
      };
    } else {
      return {
        severity: "error",
        message: "Oh no! An unexpected error occurred during form submission.",
      };
    }
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ minWidth: 120 }}>
        <AlertMessage
          open={!!alertMessage.message}
          onClose={() => setAlertMessage({})}
          message={alertMessage.message || ""}
          f
          severity={alertMessage.severity || ""}
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "flex-end", marginBottom: 2 }}>
          <Button onClick={resetUserInput} variant="outlined">
            Reset
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
          </Stack>
          <FormControl fullWidth>
         <InputLabel id="project-select-label">Project</InputLabel>
        <Select
        labelId="project-select-label"
        id="project-select"
        value={projectId}
        label="Project"
        onChange={(event) => setProjectId(event.target.value)}
        sx={{ marginBottom: 2 }}>
       {data && data.map((item) => (
        <MenuItem value={item.id} key={item.id}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <span style={{ marginRight: 8 }}>
            {item?.properties?.Projectname?.title?.[0]?.text?.content}
          </span>
          <Chip
            label={item?.properties?.Status?.select?.name}
            color={statusCheck(item?.properties?.Status?.select?.name)}
            size="small"
          />
        </Box>
      </MenuItem>
              ))}
          </Select>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb">
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              sx={{
                marginBottom: 2,
                "& > :not(style)": {
                  flex: "1",
                },
              }}>
              <DatePicker
                value={date}
                onChange={(newDate) => {
                  if (newDate) {
                    setDate(dayjs(newDate.$d).format("YYYY-MM-DD"));
                  }
                }}
                label="Date"
                sx={{ marginBottom: 2 }}
                slotProps={{
                  textField: {
                    error: false,
                  },
                }}
              />
              <TimePicker
                ampm={false}
                value={fromTime}
                onChange={(newFromTime) => setFromTime(newFromTime)}
                label="From"
                sx={{ marginBottom: 2 }}
              />
              <TimePicker
                ampm={false}
                value={toTime}
                onChange={(newToTime) => setToTime(newToTime)}
                label="To"
                sx={{ marginBottom: 2 }}
              />
            </Stack>
          </LocalizationProvider>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              label="Category"
              onChange={(event) => setSelectedCategory(event.target.value)}
              sx={{ marginBottom: 2 }}
            >
              {allCategories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            value={note}
            onChange={(event) => setNote(event.target.value)}
            id="outlined-multiline-static"
            label="Note"
            placeholder="Please tell us what you did"
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />
        </FormControl>
      </Box>
    </Container>
  );
}