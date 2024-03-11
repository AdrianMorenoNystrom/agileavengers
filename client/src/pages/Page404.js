import { Link, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from '@mui/material/CssBaseline';
import React from "react";

const Page404 = ({ isAuthenticated }) => {
    console.log('isAuthenticated:', isAuthenticated);

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <Typography variant="h3" mt={2} mb={2}>
                Error: Page Not Found
            </Typography>
            <Typography>
                <Link href="/" variant="h6" underline="hover">
                    Go to start page
                </Link>
            </Typography>
        </Container>
    );
};

export default Page404;