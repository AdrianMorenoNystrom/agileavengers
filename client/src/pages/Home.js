import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import ActiveProjects from '../components/ActiveProjects'; // Importera ActiveProjects, justera sökvägen enligt din projektstruktur

const Home = () => {
    return (
        <Container component="main" maxWidth="md">
            <CssBaseline>
                <h1>Home</h1>
                <ActiveProjects /> {}
            </CssBaseline>
        </Container>
    );
};

export default Home;
