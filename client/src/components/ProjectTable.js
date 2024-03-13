import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useFetchData from './UseFetchData';

export default function ProjectTable() {
    const { data, isLoading, error } = useFetchData('/api/projects');

    const columns = [
        { field: 'projectName', headerName: 'Project', width: 130 },
        { field: 'status', headerName: 'Status', width: 70 },
        { field: 'projectLeader', headerName: 'Project Leader', width: 130 },
        { field: 'teamMembers', headerName: 'Team Members', width: 200 },
        { field: 'startDate', headerName: 'Start Date', width: 95 },
        { field: 'endDate', headerName: 'End Date', width: 95 },
        { field: 'hoursTotal', headerName: 'Total Hours Planned', width: 150 },
        { field: 'hoursWorked', headerName: 'Hours Worked', width: 120 },
        { field: 'hoursLeft', headerName: 'Hours Remaining', width: 130 },
    ];

    const rows = data && data.map((project, index) => ({
        id: index + 1,
        projectName: project?.properties?.Projectname?.title?.[0]?.text?.content || '',
        status: project?.properties?.Status?.select?.name || '',
        projectLeader: project?.properties?.['Project Leader Name']?.rollup?.array?.[0]?.formula?.string || '',
        teamMembers: project?.properties?.['Team Members']?.rollup?.array
            ?.map((teamMember) => teamMember?.formula?.string)
            .join(', ') || '',
        startDate: project?.properties?.Timespan?.date?.start || '',
        endDate: project?.properties?.Timespan?.date?.end || '',
        hoursTotal: project?.properties?.['Total Hours']?.number || 0,
        hoursWorked: project?.properties?.['Hours Worked']?.rollup?.number || 0,
        hoursLeft: project?.properties?.['Hours Left']?.formula?.number || 0,
    }));

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}