import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../assets/Logo.png";

const NavBar = () => {
  return (
    <div className={styles.header_container}>
      <nav>
        <Link to="/">
          <img src={logo} />
        </Link>

        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/relatorios">Relatórios</Link>
          </li>
    
          <li>
            <Link to="/clientes">Clientes</Link>
          </li>
        </ul>

        <button>Agendar horário</button>
      </nav>
    </div>
  );
};

export default NavBar;
