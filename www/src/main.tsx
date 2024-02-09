import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { ParallaxProvider } from "react-scroll-parallax";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Team from "@features/pages/team.tsx";
import Demo from "@features/pages/demo.tsx";
import Home from "@features/pages/home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "team",
        element: <Team />,
      },
      {
        path: "demo",
        element: <Demo />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ParallaxProvider>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </ParallaxProvider>
  </React.StrictMode>,
);
