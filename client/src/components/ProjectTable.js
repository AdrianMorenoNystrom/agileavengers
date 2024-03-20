import React, { useState } from 'react';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    getGridDateOperators,
} from '@mui/x-data-grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import useFetchData from './UseFetchData';
import WeeklyReport from './GetWeeklyReport';
import { Box, Container } from '@mui/material';
import Divider from '@mui/material/Divider';

export default function ProjectTable() {
    const { data, isLoading, error } = useFetchData('/api/projects');
    const [showOnlyActiveProjects, setShowOnlyActiveProjects] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
        );
    }

    const columns = [
        { field: 'projectName', headerName: 'Project', width: 130, },
        { field: 'status', headerName: 'Status', width: 70 },
        { field: 'projectLeader', headerName: 'Project Leader', width: 130 },
        { field: 'teamMembers', headerName: 'Team Members', width: 200 },
        { field: 'startDate', headerName: 'Start Date', width: 125 },
        { field: 'endDate', headerName: 'End Date', width: 125 },
        { field: 'hoursTotal', headerName: 'Total Hours Planned', width: 150, align: 'right' },
        { field: 'hoursWorked', headerName: 'Hours Worked', width: 120, align: 'right' },
        { field: 'hoursLeft', headerName: 'Hours Remaining', width: 130, align: 'right' },
        { field: 'hoursOverBudget', headerName: 'Hours Over Budget', width: 135, align: 'right' },
    ];

    const rows = data && data.map((project, index) => ({
        id: index + 1,
        projectId: project?.id,
        projectName: project?.properties?.Projectname?.title?.[0]?.text?.content || '',
        status: project?.properties?.Status?.select?.name || '',
        projectLeader: project?.properties?.['Project Leader Name']?.rollup?.array?.[0]?.formula?.string || '',
        teamMembers: project?.properties?.['Team Members']?.rollup?.array
            ?.map((teamMember) => teamMember?.formula?.string).join(', ') || '',
        startDate: project?.properties?.Timespan?.date?.start || '',
        endDate: project?.properties?.Timespan?.date?.end || '',
        hoursTotal: project?.properties?.['Total Hours']?.number || 0,
        hoursWorked: project?.properties?.['Hours Worked']?.rollup?.number || 0,
        hoursLeft: project?.properties?.['Hours Left']?.formula?.number || 0,
        hoursOverBudget: project?.properties?.['Hours Over Budget']?.formula?.number || 0,
    }));

    const filterRows = (data) => {
        if (showOnlyActiveProjects) {
            return data.filter(project => project.status === 'Active');
        } else {
            return data;
        }
    };

    const handleProjectClick = (projectId) => {
        setSelectedProjectId(projectId.row.projectId);
    };


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Container style={{ height: 430, width: '100%' }}>
            <DataGrid
                sx={{
                    cursor: 'pointer',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    },
                }}
                key={showOnlyActiveProjects.toString()}
                rows={filterRows(rows)}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                // checkboxSelection
                slots={{ toolbar: CustomToolbar, getGridDateOperators }}
                slotProps={{ toolbar: { showColumnSelector: false } }}
                showOnlyActiveProjects={showOnlyActiveProjects}
                onRowClick={handleProjectClick}
            />
            <FormControlLabel
                checked={showOnlyActiveProjects}
                onChange={(event) => setShowOnlyActiveProjects(event.target.checked)}
                control={<Switch />}
                label="Show Only Active Projects"
            />
            {selectedProjectId && (
                <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <h2>{rows.find(row => row.projectId === selectedProjectId).projectName}</h2>
                        <Box sx={{ display: 'flex' }}>
                            <Box>
                                <div>Hours Planned: {rows.find(row => row.projectId === selectedProjectId).hoursTotal}</div>
                                <div>Hours Worked: {rows.find(row => row.projectId === selectedProjectId).hoursWorked}</div>
                                <div>Hours Remaining: {rows.find(row => row.projectId === selectedProjectId).hoursLeft}</div>
                                <div>Hours Over Budget: {rows.find(row => row.projectId === selectedProjectId).hoursOverBudget}</div>
                            </Box>
                            <Box sx={{ marginLeft: 5 }}>
                                <div>Project Leader: {rows.find(row => row.projectId === selectedProjectId).projectLeader}</div>
                                <div>
                                    <ul>Team:
                                        {rows
                                            .find(row => row.projectId === selectedProjectId)
                                            .teamMembers.split(', ')
                                            .map((member, index) => (
                                                <li style={{ listStyle: 'none' }} key={index}>{member}</li>
                                            ))}
                                    </ul>
                                </div>
                            </Box>
                        </Box>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    {<WeeklyReport projectId={selectedProjectId} />}
                </Box>
            )}
        </Container>
    );
}
