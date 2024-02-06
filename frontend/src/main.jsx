import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Clientes from './pages/Clientes.jsx';
import Relatorios from './pages/Relatorios.jsx';
import CriarConta from './pages/criarConta.jsx';
const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/clientes',
		element: <Clientes />,
	},
	{
		path: '/relatorios',
		element: <Relatorios />,
	},
	{
		path: '/',
		element: <Navigate to='/login' />,
	},
	{
		path: '/newuser',
		element: <CriarConta />,
	},
]);

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(<RouterProvider router={router} />);
