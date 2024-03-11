import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useFetchData from './UseFetchData';
import Container from '@mui/material/Container';
import { CssBaseline } from '@mui/material';

export default function ActiveProjects() {
    const { data, isLoading, error } = useFetchData('/api/projects/active'); // Använder den nya endpointen


    if (isLoading) return <div>Laddar...</div>;
    if (error) return <div>Fel vid hämtning av data: {error}</div>;

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline>
                <h1>Aktiva Projekt</h1>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="active projects table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Projektnamn</TableCell>
                                <TableCell align="right">Totala Timmar</TableCell>
                                {}
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
                                    {}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CssBaseline>
        </Container>
    );
}
