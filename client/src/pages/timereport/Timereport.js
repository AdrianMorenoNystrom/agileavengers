import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Select,
  Container,
  Stack,
  Button,
  TextField,
  FormControl,
  Autocomplete,
  Chip,
  InputLabel,
  MenuItem,
} from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useFetchData from "../../components/UseFetchData";
import AlertMessage from "../../components/AlertMessage";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import axios from "axios";
import statusCheck from "../../components/functions/statusCheck";
import PageLoadingContext from '../../components/functions/PageLoadingContext';

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


  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await axios.get("/api/projects");
        if (response.data && response.data.message) {
          setProjectsData(response.data.message);
        }
      } catch (error) {
        console.error("Kunde inte hämta projektdata:", error);
      }
    };

    fetchProjectsData();
  }, []);




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
  const [userId, setUserId] = useState("");
  const [projectsData, setProjectsData] = useState([]);


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
      decimalTime = parseFloat(decimalTime.toFixed(1));
      setHours(decimalTime);
    } else {
      setHours(null);
    }
  }, [fromTime, toTime]);

  const { data, isLoading, error } = useFetchData(
    "/api/projects/user-specific"
  );

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

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch("/api/people/user");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const newUserId = result.message.id;
        setUserId(newUserId);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    fetchUserId();
  }, []);

  if (isLoading) return <PageLoadingContext />;
  if (error) return <div>Error fetching data: {error}</div>;

  const isFormInvalid = () => {
    if (
      projectId === "" ||
      date === null ||
      fromTime === null ||
      toTime === null ||
      hours === null ||
      hours <= 0 ||
      category === ""
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

      if (response.status === 200 || response.status === 201) {
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


  const handleDateChange = (newDate) => {
    if (newDate) {
      const formattedDate = dayjs(newDate);
      setDate(formattedDate);

      const selectedProject = projectsData.find(project => project.id === projectId);
      if (!selectedProject) {
        console.error("Selected project not found in projectsData");
        return;
      }

      const projectTimespan = selectedProject.properties.Timespan.date;
      if (!projectTimespan || !projectTimespan.start || !projectTimespan.end) {
        console.error("Timespan data missing for selected project");
        return;
      }

      const projectStart = dayjs(projectTimespan.start);
      const projectEnd = dayjs(projectTimespan.end);

      if (formattedDate.isBefore(projectStart) || formattedDate.isAfter(projectEnd)) {
        setAlertMessage({
          severity: "warning",
          message: "You are attempting to report time outside the project's time period."
        });
      } else {
        setAlertMessage({});
      }
    }
  };

  const userProjects = data.filter(project =>
    project.properties?.People?.relation?.some(user => user.id === userId) ||
    project.properties?.['Project Leader']?.relation?.[0]?.id === userId
  );

  const otherProjects = data.filter(project =>
    !userProjects.includes(project)
  );

  const optionsWithHeaders = [
    { label: "Your Projects", disabled: true },
    ...userProjects.map(project => ({
      ...project,
      status: project.properties?.Status?.select?.name
    })).filter(project => project.status !== 'Paused'),
    { label: "Other Projects", disabled: true },
    ...otherProjects.map(project => ({
      ...project,
      status: project.properties?.Status?.select?.name
    })).filter(project => project.status !== 'Paused')
  ];

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
        {isUpdate ? (
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={projectName}
            label="Project"
            disabled
            sx={{ marginBottom: 2 }}>
            <MenuItem value={projectName}>{projectName}</MenuItem>
          </Select>
        ) : (
          <Autocomplete
            fullWidth
            id="project-autocomplete"
            value={data.find((project) => project.id === projectId) || null}
            onChange={(event, newValue) =>
              setProjectId(newValue ? newValue.id : "")
            }
            options={optionsWithHeaders.filter(option => option.properties?.Status?.select?.name !== 'Paused')}
            groupBy={(option) => option.label}
            getOptionLabel={(option) =>
              option?.properties?.Projectname?.title?.[0]?.text?.content || ""
            }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, option) => {
              if (option.id) {
                return (
                  <MenuItem {...props} key={option.id} value={option.id}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}>
                      <span style={{ marginRight: 8 }}>
                        {option?.properties?.Projectname?.title?.[0]?.text?.content}
                      </span>
                      <Chip
                        label={option.status}
                        color={statusCheck(
                          option.status
                        )}
                        size="small"
                      />
                    </Box>
                  </MenuItem>
                );
              } else {
                return null;
              }
            }}
            renderInput={(params) => <TextField {...params} label="Project" />}
            sx={{ marginBottom: 2 }}
          />
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
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
              maxDate={dayjs(new Date())}
              onChange={handleDateChange} // Använder den uppdaterade handleDateChange funktionen här
              label="Date"
              sx={{ marginBottom: 2 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!alertMessage.message}
                  helperText={alertMessage.message}
                />
              )}
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
        <TextField
          fullWidth
          value={note}
          onChange={(event) => setNote(event.target.value)}
          id="outlined-multiline-static"
          label="Note"
          placeholder="Please tell us what you did"
          multiline
          rows={4}
          sx={{ marginBottom: 2 }}
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
      </Box>
    </Container>
  );
}
