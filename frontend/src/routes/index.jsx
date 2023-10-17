import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Relatorios from "../pages/Relatorios";
import Clientes from "../pages/Clientes";
import Login from "../pages/Login";

const RoutesApp = () => {
  const signed = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={signed ? <Navigate to="/home" /> : <Navigate to="/login" />} // Redireciona para a página de login se não estiver autenticado
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={signed ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/relatorios"
          element={signed ? <Relatorios /> : <Navigate to="/login" />}
        />
        <Route
          path="/clientes"
          element={signed ? <Clientes /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
