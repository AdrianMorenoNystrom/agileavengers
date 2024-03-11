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
import { CssBaseline } from '@mui/material';

export default function GetPeople() {
    const { data } = useFetchData('/people');

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="people table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Total Hours</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.map((page) => (
                                <TableRow key={page.id}>
                                    <TableCell component="th" scope="row">
                                        {page?.properties?.Name?.title?.[0]?.text?.content}
                                    </TableCell>
                                    <TableCell align="right">
                                        {page?.properties?.['Total hours']?.rollup?.number}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CssBaseline>
        </Container>
    );
}
