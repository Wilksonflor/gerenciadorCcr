import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import RoutesApp from './routes/index'
function App() {
  return (
    <div>
    <RoutesApp/>
        {/* <NavBar />
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/clientes" element={<Clientes />} />
          </Routes>
        </div>
      </Router> */}
    </div>
  );
}

export default App;
