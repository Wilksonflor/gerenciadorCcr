/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import styles from './criarConta.module.css';
import MaskedInput from '../components/MaskedInput';
import logo from '../assets/Logo.png';

const CriarConta = () => {
	const navigate = useNavigate();
	const [nomeCompleto, setNomeCompleto] = useState('');
	const [telefone, setTelefone] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = values => {
		const user = {
			nomeCompleto: values.nomeCompleto,
			telefone: values.telefone,
			username: values.username,
			password: values.password,
		};

		axios
			.post('http://localhost:5000/auth/register', user)
			.then(response => {
				message.success('Usuário criado com sucesso');

				setTimeout(() => {
					navigate('/login');
				}, 3000);
			})
			.catch(error => {
				console.error('Erro ao enviar dados:', error);
			});
	};

	return (
		<div className={styles.containerFormNewUser}>
			<div className={styles.contentFormNewUser}>
				<Form
					className='form-control-lg'
					name='basic'
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					initialValues={{
						nomeCompleto: nomeCompleto,
						telefone: telefone,
						username: username,
						password: password,
					}}
					onFinish={handleSubmit}
					autoComplete='off'
				>
					<img src={logo} alt='logo do colégio e curso real' id='logoForm' />

					<div className={styles.formControl}>
						<div className={styles.textControl}>
							<h2>Bem-vindo a arena REAL</h2>
							<p>Preencha os dados e faça o seu cadastro</p>
						</div>
						<Form.Item
							label='Nome'
							name='nomeCompleto'
							className='nomeCompleto'
							rules={[
								{
									required: true,
									message: 'Por favor, insira seu nome completo!',
								},
							]}
						>
							<Input
								value={nomeCompleto}
								placeholder='Digite o seu nome completo'
								onChange={e => setNomeCompleto(e.target.value)}
							/>
						</Form.Item>

						<Form.Item
							label='Contato'
							name='telefone'
							value={telefone}
							onChange={e => setTelefone(e.target.value)}
							rules={[
								{
									required: true,
									message: 'Por favor, insira o contato!',
								},
							]}
						>
							<MaskedInput />
						</Form.Item>

						<Form.Item
							label='Usuário'
							name='username'
							rules={[
								{
									required: true,
									message: 'Por favor, insira seu nome de usuário!',
								},
							]}
						>
							<Input value={username} placeholder='ex: jose.junior' onChange={e => setUsername(e.target.value)} />
						</Form.Item>

						<Form.Item
							label='Senha'
							name='password'
							rules={[
								{
									required: true,
									message: 'Por favor, insira sua senha!',
								},
							]}
						>
							<Input.Password value={password} placeholder='****************' onChange={e => setPassword(e.target.value)} />
						</Form.Item>

						<Form.Item
							wrapperCol={{
								xs: { span: 24 },
								sm: { span: 16, offset: 4 },
								md: { span: 8, offset: 8 },
							}}
						>
							<Button type='primary' htmlType='submit'>
								Criar conta
							</Button>
						</Form.Item>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default CriarConta;
