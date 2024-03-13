import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useFetchData from './UseFetchData';

export default function ActiveProjects() {
    const { data, isLoading, error } = useFetchData('/api/projects/active'); // Använder den nya endpointen    

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Table aria-label="active projects table">
            <TableHead>
                <TableRow>
                    <TableCell>Projektnamn</TableCell>
                    <TableCell align="right">Totala Timmar</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data && data.map((project) => (
                    <TableRow key={project.id}>
                        <TableCell component="th" scope="row">
                            {project?.properties?.Projectname?.title?.[0]?.text?.content}
                        </TableCell>
                        <TableCell align="right">
                            {project?.properties?.['Total hours']?.rollup?.number}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
