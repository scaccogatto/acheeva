import React, {useContext} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./features/Login.jsx";
import Objective from "./features/Objective.jsx";
import Pdf from "./features/Pdf.jsx";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Schedule from "./features/Schedule.jsx";
import Feedback from "./features/Feedback.jsx";
import Quiz from "./features/Quiz.jsx";
import App from "./features/App.jsx";
import AcheevaProvider from "./providers/AcheevaProvider.jsx";
import Fallback from "./features/Fallback.jsx";
import Welcome1 from "./features/Welcome1.jsx";
import {createTheme, ThemeProvider} from "@mui/material";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        // loader: rootLoader,
        children: [
            {
                path: "/fallback",
                element: <Fallback/>,
                // loader: rootLoader,
                children: [],
            },
            {
                path: "/login",
                element: <Login/>,
                // loader: rootLoader,
                children: [],
            },
            {
                path: "/objective",
                element: <Objective/>,
                // loader: rootLoader,
                children: [],
            },
            {
                path: "/pdf",
                element: <Pdf/>,
                // loader: rootLoader,
                children: [],
            },
            {
                path: "/schedule",
                element: <Schedule/>,
                // loader: rootLoader,
                children: [],
            },
            {
                path: "/quiz/:number",
                element: <Quiz/>,
                // loader: rootLoader,
                children: [],
            },
            {
                path: "/feedback",
                element: <Feedback/>,
                // loader: rootLoader,
                children: [],
            },
            {
                path: "/welcome",
                element: <Welcome1/>,
                // loader: rootLoader,
                children: [],
            }],
    }
]);

const theme = createTheme({
    palette: {
        primary: {
            main: "#804FD0"
        },
    }
});


ReactDOM.createRoot(document.getElementById('root')).render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AcheevaProvider>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </AcheevaProvider>
    </LocalizationProvider>
);
