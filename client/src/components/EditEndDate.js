import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

function EditEndDate({ currentEndDate, handleCancel, submitEndDate }) {
    const [selectedDate, setSelectedDate] = useState(dayjs(currentEndDate));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = () => {
        const formattedDate = selectedDate.format("YYYY-MM-DD");
        submitEndDate(formattedDate);
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                <DatePicker
                    value={selectedDate}
                    label="Edit end date"
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{marginTop: 1}}
                />
            </LocalizationProvider>
            <Stack direction="row" spacing={1} sx={{ marginTop: 1, marginBottom: 1 }}>
                <Button onClick={handleCancel} variant="outlined">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Submit</Button>
            </Stack>
        </div>
    );
}

export default EditEndDate;
