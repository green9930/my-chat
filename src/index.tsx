import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/theme';
import GlobalStyle from '@styles/GlobalStyle';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
