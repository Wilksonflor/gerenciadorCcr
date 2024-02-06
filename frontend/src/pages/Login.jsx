/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import axios from 'axios';
import { MDBContainer, MDBCardBody, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import jogador from '../assets/jogador.jpg';
import logo from '../assets/logo.png';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const response = await axios.post('http://localhost:5000/authenticate', {
				username,
				password,
			});

			navigate('/');
		} catch (error) {
			setErrorMessage('Credenciais inválidas');
		}
	};

	return (
		<div className={styles.container_Login}>
			<div className={styles.login_left}>
				<img src={jogador} className={styles.jogador} alt='Jogador' />
			</div>

			<div className={styles.wrapper_form}>
				<div className={styles.header_form}>
					<h1>Gerenciador de horários</h1>
					<img src={logo} className={styles.logoLogin} />
					<h2>Faça login na sua conta</h2>
				</div>
				<MDBContainer>
					<form className='form' onSubmit={handleSubmit}>
						<MDBCol md='4'>
							<MDBCardBody className='d-flex flex-column'>
								<label>Usuário</label>
								<MDBInput
									wrapperClass='mb-4'
									name='usuario'
									id='usuario'
									value={username}
									onChange={e => setUsername(e.target.value)}
									type='text'
									size='lg'
								/>
								<label>Senha</label>
								<MDBInput
									wrapperClass='mb-4 '
									name='password'
									id='password'
									value={password}
									onChange={e => setPassword(e.target.value)}
									type='password'
									size='lg'
								/>

								<button type='submit' className={styles.btn_entrar}>
									Entrar
								</button>

								{errorMessage && (
									<div className='alert alert-danger mt-3' role='alert'>
										{errorMessage}
									</div>
								)}

								<a className='small text-muted m-2' href='#!'>
									Esqueceu a senha?
								</a>

								<p className='ms-5 m-5'>
									Não tem uma conta? <Link to='/newuser'>Criar conta</Link>
								</p>
							</MDBCardBody>
						</MDBCol>
					</form>
				</MDBContainer>
			</div>
		</div>
	);
};

export default Login;
