import React, { useState /* useHistory */ } from 'react';
import { /*Navigate*/ useNavigate, Link } from 'react-router-dom';
import jogador from '../assets/jogador.jpg';
import logo from '../assets/logo-site-real.png';
import styles from './Login.module.css';
import { MDBContainer, MDBCardBody, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	// const [inputErrorClass, setInputErrorClass] = useState('');
	// const [isModalOpen, setIsModalOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	// const openModal = () => {setIsModalOpen(true)};

	// const closeModal = () => {setIsModalOpen(false)};

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const response = await axios.post('http://ec2-18-191-81-30.us-east-2.compute.amazonaws.com:5000/authenticate', {
				username,
				password,
			});
			console.log('fez o login', response);

			navigate('/');
		} catch (error) {
			console.log('Erro na autenticação erro:', error);
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
