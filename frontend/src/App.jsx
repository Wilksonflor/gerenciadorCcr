import { Outlet, Route, Navigate } from "react-router-dom";
import "./App.css";
import RoutesApp from './routes/index'

function App() {
  return (
    <div>
      <RoutesApp />
      <Outlet />
    </div>
  );
}

export default App;
