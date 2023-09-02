import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Clientes from "./pages/Clientes.jsx";
import Relatorios from "./pages/Relatorios.jsx";
import CriarConta from "./components/criarConta.jsx";
const router = createBrowserRouter([
  
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/clientes",
    element: <Clientes />,
  },
  {
    path: "/relatorios",
    element: <Relatorios />,
  },
  {
    path: "/newuser",
    element: <CriarConta/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
