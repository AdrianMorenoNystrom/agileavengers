import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useFetchData from "../../components/UseFetchData";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Container, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import AlertMessage from "../../components/AlertMessage";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

export default function Timereport() {
  const [projectId, setProjectId] = useState("");
  const [date, setDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [hours, setHours] = useState(null);
  const [note, setNote] = useState("");
  const [alertMessage, setAlertMessage] = useState({});

  const resetUserInput = () => {
    setProjectId("");
    setDate(null);
    setFromTime(null);
    setToTime(null);
    setHours(null);
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

  const { data, isLoading, error } = useFetchData("/api/projects/active");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error}</div>;

  const isFormInvalid = () => {
    if (
      projectId === "" ||
      date === null ||
      fromTime === null ||
      toTime === null ||
      hours === null ||
      note === "" ||
      hours <= 0
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
        "http://localhost:3500/api/timereports/add",
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
          <InputLabel id="demo-simple-select-label">Project</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={projectId}
            label="Project"
            onChange={(event) => setProjectId(event.target.value)}
            sx={{ marginBottom: 2 }}>
            {data &&
              data.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item?.properties?.Projectname?.title?.[0]?.text?.content}
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
                onChange={(newDate) =>
                  setDate(dayjs(newDate.$d).format("YYYY-MM-DD"))
                }
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
