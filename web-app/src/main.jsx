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

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        // loader: rootLoader,
        children: [
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
                path: "/quiz",
                element: <Quiz/>,
                // loader: rootLoader,
                children: [],
            },
            {
                path: "/feedback",
                element: <Feedback/>,
                // loader: rootLoader,
                children: [],
            }]
    }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AcheevaProvider>
            <RouterProvider router={router}/>
        </AcheevaProvider>
    </LocalizationProvider>
);
