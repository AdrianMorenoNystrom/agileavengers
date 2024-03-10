import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function LoginError({ open, onClose }) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        onClose(event, reason);
    };

    return (
        <div>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    Failed to create account. Make sure you don't leave any field empty!
                </Alert>
            </Snackbar>
        </div>
    );
}