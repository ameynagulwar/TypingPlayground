import React from "react";
import {GobalStyles} from "./Styles/global.js"
import { ThemeProvider } from "styled-components";
import { useTheme } from "./Context/ThemeContext.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import UserPage from "./Pages/UserPage.jsx";

const App = () => {
  const {theme} = useTheme();
  return (
    <ThemeProvider theme={theme}>
       <ToastContainer/>
         <GobalStyles/>
         <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/User" element={<UserPage/>}></Route>
         </Routes>


    </ThemeProvider>
  );
}

export default App;
