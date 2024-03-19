import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import SubmitToNotion from '../components/SubmitUser';
import FirstNameFieldValidation from './functions/FirstNameValidation';
import LastNameFieldValidation from './functions/LastNameValidation';
import CircularProgress from '@mui/material/CircularProgress';
import CreateAccountError from '../components/CreateAccountError';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AlertMessage from '../components/AlertMessage';

const defaultTheme = createTheme();

export default function CreateAccount() {

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [invalidAccountMessage, setInvalidAccountMessage] = useState(false);

  const handleCloseMessage = () => {
    setInvalidAccountMessage(false);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.target);
      const firstName = data.get('firstname');
      const lastName = data.get('lastname');
      const email = data.get('email');
      const password = data.get('password');
      const role = data.get('role');

      // To do, check valid email? 

      if (!firstName || !lastName || !email || !password || !role) {
        setInvalidAccountMessage(true);
        return;
      }

      SubmitToNotion(firstName,lastName, email, password, role);

      // Loading animation and the order it comes in can be changed for a better user experience.

      setShowLoading(true);


      setTimeout(() => {
        setShowSuccessAlert(true);
        setShowLoading(false);
        event.target.reset();
      }, 1000);

      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 5000);


    } catch (error) {
      console.error('Error submitting to Notion:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonAddOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Add User
          </Typography>

          {showLoading && (
            <CircularProgress />
          )}

          {showSuccessAlert && (
            <Alert severity="success">User successfully added!</Alert>
          )}

          <AlertMessage
            message="Failed to create account. Make sure you don't leave any field empty!"
            severity='error'
            open={invalidAccountMessage}
            onClose={handleCloseMessage}
          />

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container rowSpacing={3}>

              <Grid item xs={12}>

                <FirstNameFieldValidation />

              </Grid>
              <Grid item xs={12}>

                <LastNameFieldValidation />
                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                >
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth>
              <InputLabel id="selectrole">Role</InputLabel>
              <Select
                labelId="selectrole"
                id="role"
                label="Role"
                name="role"
                defaultValue={''}
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Owner">Owner</MenuItem>
              </Select>
              </FormControl>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add user to database
              </Button>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
