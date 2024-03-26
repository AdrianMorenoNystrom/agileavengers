import React, { useState, useEffect } from 'react';
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
import { Box, Container, Chip } from '@mui/material';
import Divider from '@mui/material/Divider';
import GetAllProjectAvatars from './GetAllProjectAvatars';
import statusCheck from './functions/statusCheck';
import '../pages/projects/projects.scss';
import { formatTime } from './functions/timeFormatter';

export default function ProjectTable() {
    const { data, isLoading, error } = useFetchData('/api/projects');
    const [showOnlyUserProjects, setShowOnlyUserProjects] = useState(false);
    const [userId, setUserId] = useState("");
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
        { 
            field: 'teamMembers', 
            headerName: 'Team Members', 
            width: 200, 
            renderCell: (params) => {
                const projectId = params.row.projectId; 
                return (
                        <GetAllProjectAvatars projectId={projectId} max={3}/>
                );
            }
        },
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
        projectLeaderId: project?.properties?.['Project Leader']?.relation?.[0]?.id || '',
        teamMemberId: project?.properties?.People?.relation
            ?.map((teamMember) => teamMember?.id) || '',
        startDate: project?.properties?.Timespan?.date?.start || '',
        endDate: project?.properties?.Timespan?.date?.end || '',
        hoursTotal: formatTime(project?.properties?.['Total Hours']?.number || 0, true),
        hoursWorked: formatTime(project?.properties?.['Hours Worked']?.rollup?.number || 0, true),
        hoursLeft: formatTime(project?.properties?.['Hours Left']?.formula?.number || 0, true),
        hoursOverBudget: formatTime(project?.properties?.['Hours Over Budget']?.formula?.number || 0, true),
    }));

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await fetch('/api/people/user');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setUserId(result.message.id);
            } catch (error) {
                console.error("Error fetching categories: ", error);
            }
        };
        fetchUserId();
    }, []);

    const filteredRows = (data) => {
        if (showOnlyUserProjects) {
            return data.filter(project => {
                return project.projectLeaderId === userId || project.teamMemberId.includes(userId);
            });
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
        <Container style={{ width: '100%' }}>
            <DataGrid
                sx={{
                    cursor: 'pointer',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    }
                }}
                key={showOnlyUserProjects.toString()}
                rows={filteredRows(rows)}
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
                showOnlyActiveProjects={showOnlyUserProjects}
                onRowClick={handleProjectClick}
            />
            <FormControlLabel
                control={<Switch />}
                label="View Only Your Projects"
                checked={showOnlyUserProjects}
                onChange={(event) => setShowOnlyUserProjects(event.target.checked)}
            />
            {selectedProjectId && (
                <Box className='project-container'>
                    <Box className='project-data'>
                        <Box className='project-title'>
                            <h2>{rows.find(row => row.projectId === selectedProjectId).projectName}</h2>
                            <Chip
                                className="status"
                                color={statusCheck(rows.find(row => row.projectId === selectedProjectId).status)}
                                size="small"
                                label={rows.find(row => row.projectId === selectedProjectId).status}
                            />
                        </Box>
                        <Box className='project-info'>
                            <div className='item'>
                                <div className='item-title'>Start Date</div>
                                <div className='item-value'>{rows.find(row => row.projectId === selectedProjectId).startDate}</div>
                            </div>
                            <div className='item'>
                                <div className='item-title'>End Date</div>
                                <div className='item-value'>{rows.find(row => row.projectId === selectedProjectId).endDate}</div>
                            </div>
                            <div className='item'>
                                <div className='item-title'>Total Hours</div>
                                <div className='item-value'>Planned: {rows.find(row => row.projectId === selectedProjectId).hoursTotal}</div>
                                <div className='item-value'>Worked: {rows.find(row => row.projectId === selectedProjectId).hoursWorked}</div>
                                <div className='item-value'>Remaining: {rows.find(row => row.projectId === selectedProjectId).hoursLeft}</div>
                                <div className='item-value'>Over Budget: {rows.find(row => row.projectId === selectedProjectId).hoursOverBudget}</div>
                            </div>
                            <div className='item'>
                                <div className='item-title'>Project Leader</div>
                                <div className='item-value'>{rows.find(row => row.projectId === selectedProjectId).projectLeader}</div>
                            </div>
                            <div className='item'>
                                <div className='item-title'>Team</div>
                                <div className='item-value'>
                                    <ul>
                                        <GetAllProjectAvatars projectId={selectedProjectId} max={10} spacing={'large'}/>
                                    </ul>
                                </div>
                            </div>
                        </Box>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box className='project-data'>
                        {<WeeklyReport projectId={selectedProjectId} />}
                    </Box>
                </Box>
            )}
        </Container>
    );
}
