import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import RoutesApp from './routes/index'

import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
    
      <div>
        <RoutesApp />
      </div>
    </Router>
  );
}

export default App;
