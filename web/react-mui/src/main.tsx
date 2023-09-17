import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import App from './App';
import HomePage from './components/homepage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <HomePage />
      <CssBaseline />

      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
