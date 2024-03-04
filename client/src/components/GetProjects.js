import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

import useFetchData from './UseFetchData';

export default function GetProjects() {
    const data = useFetchData('/projects');

    return (
        <Container maxWidth="md">
            <h1>Projects - Notion Data</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="projects table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Total Hours</TableCell>
                            <TableCell align="right">Current Project</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((page) => (
                            <TableRow key={page.id}>
                                <TableCell component="th" scope="row">
                                    {page?.properties?.Projectname?.title?.[0]?.text?.content}
                                </TableCell>
                                <TableCell align="right">
                                    {page?.properties?.['Total hours']?.rollup?.number}
                                </TableCell>
                                <TableCell align="right">
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
