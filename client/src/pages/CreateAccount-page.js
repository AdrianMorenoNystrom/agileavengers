import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import SubmitToNotion from '../components/SubmitUser';
import NameFieldValidation from './functions/NameValidation';
import Copyright from '../components/Copyright';
import CircularProgress from '@mui/material/CircularProgress';


const defaultTheme = createTheme();

export default function CreateAccount() {

  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const fullName = data.get('fullName');
      const email = data.get('email');
      const password = data.get('password');
      
      // To do, check valid email? 

      if (!fullName || !email || !password) {
        setShowErrorAlert(true);
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 3000);
        return;
      }


      SubmitToNotion(fullName, email, password);


      // Loading animation and the order it comes in can be changed for a better user experience.

      setShowLoading(true);

      event.target.reset();
      setTimeout(() => {
        setShowSuccessAlert(true);
        setShowLoading(false);
      }, 2000)

      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate('/Login');
      }, 5000);


    } catch (error) {
      console.error('Error submitting to Notion:', error);
      setShowErrorAlert(true);

      setTimeout(() => {
        setShowErrorAlert(false);
      }, 5000);
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
            Create Account
          </Typography>

          {showLoading && (
              <CircularProgress />
          )}

          {showSuccessAlert && (
            <Alert severity="success">Account successfully created!</Alert>
          )}

          {showErrorAlert && (
            <Alert severity="error">Failed to create account. Make sure you don't leave any field empty!</Alert>
          )}
        
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              
              <Grid item xs={12}>

                <NameFieldValidation/> 

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
              autoFocus>
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
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Account
              </Button>
              <Grid item></Grid>
              <Link href="/Login" variant="body2">
                Already have an account? Sign in here!
              </Link>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
