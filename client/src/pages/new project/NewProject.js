import React, { useState, useEffect } from 'react';
import { InputLabel, TextField, Button, Autocomplete, Box, Select, MenuItem, FormControl } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AlertMessage from "../../components/AlertMessage";
import dayjs from 'dayjs';
import './new-project.scss';

const CreateNewProject = () => {
    const [projectName, setProjectName] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [hours, setHours] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [selectedProjectLeader, setSelectedProjectLeader] = useState('');
    const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
    const [description, setDescription] = useState('');
    const [alertMessage, setAlertMessage] = useState({});
    const [resetTeamMembers, setResetTeamMembers] = useState(false);

    const resetUserInput = () => {
        setProjectName('');
        setStartDate(null);
        setEndDate(null);
        setSelectedStatus('');
        setHours('');
        setSelectedProjectLeader('');
        setResetTeamMembers((prev) => !prev);
        setDescription('');
    };

    const isFormInvalid = () => {
        if (
            projectName === '' ||
            startDate === null ||
            endDate === null ||
            selectedStatus === '' ||
            hours === null ||
            hours <= 0 ||
            selectedProjectLeader === '' ||
            selectedTeamMembers.length === 0 ||
            description === ''
        ) {
            const alertMessage = {
                severity: "error",
                message:
                    "Failed to submit form! Please fill out all fields.",
            };
            setAlertMessage(alertMessage);

            return true;
        }
        return false;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isFormInvalid()) return;

        const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
        const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");

        try {
            const response = await fetch("../../../api/projects/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        projectName: projectName,
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,
                        status: selectedStatus,
                        hours: hours,
                        projectLeaderId: selectedProjectLeader,
                        teamMembersId: selectedTeamMembers,
                        description: description
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
                message: "You have successfully created a new project!",
            };
        } else {
            return {
                severity: "error",
                message: "Oh no! An unexpected error occurred during form submission.",
            };
        }
    };

    const statusOptions = [
        { id: 1, status: 'Active' },
        { id: 2, status: 'Next up' },
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/people');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();

                const users = result.message.map((user) => ({
                    id: user.id,
                    name: user.properties['Full Name'].formula.string
                }));

                setAllUsers(users);
            } catch (error) {
                console.error("Error fetching categories: ", error);
            }
        };

        fetchUsers();
    }, []);

    const handleMembersChange = (event, values) => {
        if (Array.isArray(values)) {
            const selectedTeamMemberIds = values.map((value) => value.id);
            setSelectedTeamMembers(selectedTeamMemberIds);
        }
    };

    return (
        <Box className='project-form' component="form" onSubmit={handleSubmit} sx={{ minWidth: 120 }}>
            <AlertMessage
                open={!!alertMessage.message}
                onClose={() => setAlertMessage({})}
                message={alertMessage.message || ""}
                f
                severity={alertMessage.severity || ""}
            />
            <Box className='name-input'>
                <TextField
                    className='form-input'
                    label="Project Name"
                    value={projectName}
                    onChange={(event) => setProjectName(event.target.value)}
                    fullWidth
                    required
                />
            </Box>
            <Box className='date-input'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        className='form-input'
                        label="Start Date *"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        format='DD/MM/YYYY'
                        slotProps={{ textField: { variant: 'outlined' } }}
                        fullWidth
                        required
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        className='date-input form-input'
                        label="End Date *"
                        value={endDate}
                        minDate={startDate}
                        onChange={(date) => setEndDate(date)}
                        format='DD/MM/YYYY'
                        slotProps={{ textField: { variant: 'outlined' } }}
                        fullWidth
                        required
                    />
                </LocalizationProvider>
            </Box>
            <Box className='status-input'>
                <FormControl className='form-control'>
                    <InputLabel id="status-label">Status *</InputLabel>
                    <Select
                        className='form-input'
                        labelId='status-label'
                        label='Status'
                        value={selectedStatus}
                        onChange={(event) => setSelectedStatus(event.target.value)}
                        fullWidth
                        required
                    >
                        {statusOptions.map((option) => (
                            <MenuItem key={option.id} value={option.status}>
                                {option.status}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box className='hours-input'>
                <TextField
                    className='form-input'
                    label="Estimated Hours"
                    value={hours}
                    onChange={(event) => setHours(event.target.value)}
                    fullWidth
                    required
                    type="number"
                    inputProps={{ min: 0 }}
                />
            </Box>
            <Box className='project-leader-input'>
                <FormControl className='form-control'>
                    <InputLabel id="project-leader-label">Project Leader *</InputLabel>
                    <Select
                        className='form-input'
                        labelId='project-leader-label'
                        label='Project Leader'
                        value={selectedProjectLeader}
                        onChange={(event) => setSelectedProjectLeader(event.target.value)}
                        fullWidth
                        required
                    >
                        {allUsers.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box className='team-members-input'>
                <Autocomplete
                    className='form-input'
                    multiple
                    id="members"
                    options={allUsers}
                    getOptionLabel={(option) => option.name}
                    key={resetTeamMembers}
                    onChange={handleMembersChange}
                    renderInput={(params) => <TextField {...params} label="Team Members *" />}
                    fullWidth
                    required
                />
            </Box>
            <Box className='description-input'>
                <TextField
                    className='form-input'
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    label="Project Description"
                    placeholder="130 characters or less"
                    multiline
                    rows={4}
                    inputProps={{ maxLength: 130 }}
                    fullWidth
                    required
                />
            </Box>
            <Box className='btn-container'>
                <Button onClick={resetUserInput} variant="outlined">
                    Reset
                </Button>
                <Button type="submit" variant="contained" color="primary" className='submit-btn'>
                    Create Project
                </Button>
            </Box>
        </Box>
    );
};

export default CreateNewProject;
