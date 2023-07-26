import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Relatorios from "../pages/Relatorios";
import Clientes from "../pages/Clientes";
import Login from "../pages/Login";

const Private = ({ Item }) => {
  const signed = false; 
  return signed ? <Item /> : <Login />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Private Item={Home} />} />
        <Route path="/relatorios" element={<Private Item={Relatorios} />} />
        <Route path="/clientes" element={<Private Item={Clientes} />} />
        <Route path="/*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
