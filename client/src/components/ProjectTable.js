import React, { useState } from 'react';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import useFetchData from './UseFetchData';

export default function ProjectTable() {
    const { data, isLoading, error } = useFetchData('/api/projects');
    const [showOnlyActiveProjects, setShowOnlyActiveProjects] = useState(false);

    const dateFormatter = new Intl.DateTimeFormat('us-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

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
    ];

    const rows = data && data.map((project, index) => ({
        id: index + 1,
        projectName: project?.properties?.Projectname?.title?.[0]?.text?.content || '',
        status: project?.properties?.Status?.select?.name || '',
        projectLeader: project?.properties?.['Project Leader Name']?.rollup?.array?.[0]?.formula?.string || '',
        teamMembers: project?.properties?.['Team Members']?.rollup?.array
            ?.map((teamMember) => teamMember?.formula?.string).join(', ') || '',
        startDate: dateFormatter.format(new Date(project?.properties?.Timespan?.date?.start)) || '',
        endDate: dateFormatter.format(new Date(project?.properties?.Timespan?.date?.end)) || '',
        hoursTotal: project?.properties?.['Total Hours']?.number || 0,
        hoursWorked: project?.properties?.['Hours Worked']?.rollup?.number || 0,
        hoursLeft: project?.properties?.['Hours Left']?.formula?.number || 0,
    }));

    const filterRows = (data) => {
        if (showOnlyActiveProjects) {
            return data.filter(project => project.status === 'Active');
        } else {
            return data;
        }
    };

    const handleProjectClick = () => {
        console.log('Clicked');
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ height: 430, width: '100%' }}>
            <DataGrid
                key={showOnlyActiveProjects.toString()}
                rows={filterRows(rows)}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                slots={{ toolbar: CustomToolbar }}
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
        </div>
    );
}
