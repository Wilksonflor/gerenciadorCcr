import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Relatorios from "../pages/Relatorios";
import Clientes from "../pages/Clientes";
import Login from "../pages/Login";

const Private = ({ Item }) => {
  const signed = true; 
  return signed ? <Item /> : <Navigate to="/login" />;
};

const RoutesApp = () => {
  return (

      <Routes>
        <Route element={<Private Item={Home} />} path="/home" />
        <Route element={<Private Item={Relatorios} />} path="/relatorios" />
        <Route element={<Private Item={Clientes} />} path="/clientes" />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>

  );
};

export default RoutesApp;
