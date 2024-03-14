import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useFetchData from './UseFetchData';

export default function ActiveProjects({ onProjectSelect }) {
    const { data, isLoading, error } = useFetchData('/api/projects/active');
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    if (isLoading) return <div>Laddar...</div>;
    if (error) return <div>Fel vid hämtning av data: {error}</div>;

    const handleRowClick = (project) => {
        onProjectSelect(project);
        setSelectedProjectId(project.id);
    };

    return (
        <Table aria-label="active projects table">
            <TableHead>
                <TableRow>
                    <TableCell>Project Name</TableCell>
                    <TableCell align="right">Project Leader</TableCell>
                    <TableCell align="right">Start Date</TableCell>
                    <TableCell align="right">End Date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data && data.map((project) => (    
                    <TableRow
                        key={project.id}
                        onClick={() => handleRowClick(project)}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: project.id === selectedProjectId ? '#e6e5e5' : 'transparent',
                        }}
                    >
                        <TableCell component="th" scope="row">
                            {project?.properties?.Projectname?.title?.[0]?.text?.content}
                        </TableCell>
                        <TableCell align="right">
                            {project?.properties?.['Project Leader Name']?.rollup?.array?.[0]?.formula?.string || "N/A"}
                        </TableCell>
                        <TableCell align="right">
                            {project?.properties?.Timespan?.date?.start || "N/A"}
                        </TableCell>
                        <TableCell align="right">
                            {project?.properties?.Timespan?.date?.end || "N/A"}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
