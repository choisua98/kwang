import React from 'react';
import ReactDOM from 'react-dom/client';
import { Reset } from 'styled-reset';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider as JotaiProvider } from 'jotai';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <JotaiProvider>
    <Reset />
    <App />
  </JotaiProvider>,
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
