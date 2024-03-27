import { createTheme } from '@mui/material/styles';
import '@fontsource-variable/inter';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Inter', 
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  
});

export default theme;
