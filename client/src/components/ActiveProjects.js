import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useFetchData from './UseFetchData';
 
export default function ActiveProjects() {
    const { data, isLoading, error } = useFetchData('/api/projects/active');
 
    if (isLoading) return <div>Laddar...</div>;
    if (error) return <div>Fel vid hämtning av data: {error}</div>;
 
    return (
        <Table aria-label="active projects table">
            <TableHead>
                <TableRow>
                    <TableCell>Project Name</TableCell>
                    {/*<TableCell align="right">Project Leader</TableCell> //ska implementeras senare*/}
                    <TableCell align="right">Hours Left</TableCell>
                    <TableCell align="right">End Date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data && data.map((project) => (
                    <TableRow key={project.id}>
                        <TableCell component="th" scope="row">
                            {project?.properties?.Projectname?.title?.[0]?.text?.content}
                        </TableCell>
                       {/* <TableCell align="right">                    
                            {project?.properties?.['Project Leader']?.people?.[0]?.title?.FirstName || "N/A"}
                </TableCell> } //Behövs backend logik för att häma namn för project Leader*/}
                        <TableCell align="right">                      
                            {project?.properties?.['Hours Left']?.formula?.number || "N/A"}
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
 