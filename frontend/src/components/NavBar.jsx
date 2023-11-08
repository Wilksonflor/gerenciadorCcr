import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../assets/Logo.png";
import InserirHorario from './InserirHorario'
import { Button, Space } from 'antd';
import { useState } from "react";

const NavBar = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  
  const handleOpenModal = () =>{
    setModalOpen(true)  
  }
  const handleCloseModal = () =>{
    setModalOpen(false)  
  }

  const toggleMenu = () =>{
    setMenuOpen(!menuOpen)
  }

  return (
    <div className={styles.header_container} onClick={toggleMenu}>
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

      <Space wrap>
      
       <Button type="primary" id="btnNavbar" onClick={handleOpenModal}>Agendar horário</Button>
      </Space>
      </nav>
      {modalOpen && (
        <InserirHorario onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default NavBar;