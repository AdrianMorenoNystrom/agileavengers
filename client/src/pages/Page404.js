import { Link } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from '@mui/material/CssBaseline';
import React from "react";

const Page404 = () => {
    return (
        <Container component="main" maxWidth="md">
            <CssBaseline>
                <h1>Error: Page Not Found</h1>
                <Link to="/login">Go to login page</Link>
                <br />
                <Link to="/">Go start page</Link>
            </CssBaseline>
        </Container>
    );
};

export default Page404;