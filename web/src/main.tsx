import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import App from './App';
import HomePage from './components/homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path="/login" element={<SignIn />} />
          <Route path='/homepage' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      {/* <HomePage />
      <CssBaseline />
      <App /> */}
    </ThemeProvider>
  </React.StrictMode>,
);
