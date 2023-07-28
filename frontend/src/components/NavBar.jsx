import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../assets/Logo.png";
import { Button, Space } from 'antd';
const NavBar = () => {
  return (
    <div className={styles.header_container}>
      <nav>
        <Link to="/home">
          <img src={logo} />
        </Link>

        <ul>
          <li>
            <Link to="/home">Inicio</Link>
          </li>
          <li>
            <Link to="/relatorios">Relatórios</Link>
          </li>
    
          <li>
            <Link to="/clientes">Clientes</Link>
          </li>
        </ul>

      <Space wrap>
       <Button type="primary">Agendar horário</Button>
      </Space>
      </nav>
    </div>
  );
};

export default NavBar;
