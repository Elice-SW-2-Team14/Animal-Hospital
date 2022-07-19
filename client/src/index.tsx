import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/Colors';
import '@fortawesome/fontawesome-free/js/all.js';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ThemeProvider>
);
