import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TestModeCondextProvider } from './Context/TestModeContext';
import { ThemeContextProvider } from './Context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <ThemeContextProvider>
      <TestModeCondextProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </TestModeCondextProvider>
   </ThemeContextProvider>
  </React.StrictMode>
);

