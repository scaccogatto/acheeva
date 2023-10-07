import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./features/Login.jsx";
import Objective from "./features/Objective.jsx";
import Pdf from "./features/Pdf.jsx";

const router = createBrowserRouter([
    {
        path: "/",
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
        element: <Pdf>Pdf</Pdf>,
        // loader: rootLoader,
        children: [],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
