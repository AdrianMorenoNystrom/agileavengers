import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import AlertMessage from "../../components/AlertMessage";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import axios from "axios";

export default function Timereport({ isUpdate }) {
  const { id } = useParams();
  const [timereportData, setTimereportData] = useState(null);

  useEffect(() => {
    if (isUpdate) {
      const fetchData = async () => {
        try {
          const params = { time_report_id: id };
          const response = await axios.get("/api/timereports", { params });
          setTimereportData(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [isUpdate, id]);

  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [date, setDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [hours, setHours] = useState(null);
  const [note, setNote] = useState("");
  const [alertMessage, setAlertMessage] = useState({});
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    if (timereportData) {
      setProjectId(timereportData.data.id);
      setProjectName(
        timereportData.data.properties["Project Name"].rollup.array[0].title[0]
          .text.content
      );
      setDate(dayjs(timereportData.data.properties.Date.date.start));
      setFromTime(dayjs(timereportData.data.properties.From.date.start));
      setToTime(dayjs(timereportData.data.properties.To.date.start));
      setCategory(timereportData.data.properties.Category.select.name);
      setNote(timereportData.data.properties.Note.title[0].text.content);
      setHours(timereportData.data.properties.Hours.number);
    }
  }, [timereportData]);

  const resetUserInput = () => {
    setProjectId("");
    setDate(null);
    setFromTime(null);
    setToTime(null);
    setHours(null);
    setCategory("");
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
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
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
      category === "" ||
      note === ""
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
    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    try {
      const response = await fetch("../../api/timereports/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          date: formattedDate,
          hours: hours,
          note: note,
          category: category,
          fromTime: fromTime,
          toTime: toTime,
          isUpdate: isUpdate,
        }),
        credentials: "include",
      });

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
        message: `Your time report on ${projectName} has been updated!`,
      };
    } else if (status === 201)
      return {
        severity: "success",
        message: "Your time report has successfully been submitted!",
      };
    else {
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
            {isUpdate ? "Update" : "Submit"}
          </Button>
        </Stack>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Project</InputLabel>
          {isUpdate ? (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={projectName}
              label="Project"
              disabled
              sx={{ marginBottom: 2 }}>
              <MenuItem value={projectName}>{projectName}</MenuItem>
            </Select>
          ) : (
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
          )}
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
              value={category}
              label="Category"
              onChange={(event) => setCategory(event.target.value)}
              sx={{ marginBottom: 2 }}>
              {allCategories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField fullWidth
            value={note}
            onChange={(event) => setNote(event.target.value)}
            id="outlined-multiline-static"
            label="Note"
            placeholder="Please tell us what you did"
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />
      </Box>
    </Container>
  );
}

