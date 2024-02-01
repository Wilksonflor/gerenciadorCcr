import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import logo from '../assets/Logo.png';
import InserirHorario from './InserirHorario';
import { Button, Space } from 'antd';

const NavBar = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	const handleOpenModal = () => {
		setModalOpen(true); // Para abrir o modal
	};
	const handleCloseModal = () => {
		setModalOpen(false); // Para fechar o modal
	};

	const handleToggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<div className={styles.header_container}>
			<Link to='/'>
				<img src={logo} alt='Logo' />
			</Link>
			<nav>
				<div className={styles.menu_icon} onClick={handleToggleMenu}>
					<div className={styles.icon_bar}></div>
					<div className={styles.icon_bar}></div>
					<div className={styles.icon_bar}></div>
				</div>

				<ul className={menuOpen ? styles.menu_open : styles.menu}>
					<li>
						<Link to='/'>Inicio</Link>
					</li>
					<li>
						<Link to='/relatorios'>Relatórios</Link>
					</li>
					<li>
						<Link to='/clientes'>Clientes</Link>
					</li>
					<li id='btnNavbarLi'>
						<Button
							type='primary'
							id='btnNavbar'
							style={{
								margin: 0,
							}}
							onClick={handleOpenModal}
						>
							Agendar horário
						</Button>
					</li>
				</ul>
			</nav>
			{modalOpen && <InserirHorario onClose={handleCloseModal} />}
		</div>
	);
};
export default NavBar;
