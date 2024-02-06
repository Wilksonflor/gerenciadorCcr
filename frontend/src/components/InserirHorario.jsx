/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { Modal, Form, Select, DatePicker, ConfigProvider, message, AutoComplete } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import styles from './InserirHorario.module.css';

dayjs.extend(customParseFormat);

const InserirHorario = ({ onClose }) => {
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [clienteSelecionado, setClienteSelecionado] = useState(null);
	const [clientesFiltrados, setClientesFiltrados] = useState([]);
	const [erroHorarioNaoDisponivel, setErroHorarioNaoDisponivel] = useState(false);
	const [horaInicio, setHoraInicio] = useState('');
	const [horaTermino, setHoraTermino] = useState('');
	const [modalidade, setModalidade] = useState('');
	const [valorHoraBeach, setValorHoraBeach] = useState(60.0);
	const [horariosAgendados, setHorariosAgendados] = useState([]);

	const opcoesHorarios = ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

	const verificarDisponibilidade = async (date, horaInicio, horaTermino) => {
		try {
			const response = await axios.get(
				`http://localhost:5000/verificarDisponibilidade?date=${date}&horaInicio=${horaInicio}&horaTermino=${horaTermino}`,
			);

			// console.log('resposta da verificação da disponibilidade', response.data.disponivel);
			return response.data.disponivel;
		} catch (error) {
			console.log('erro ao verificar disponibilidade', error);
			return false;
		}
	};

	const handleHoraInicioChange = async value => {
		setHoraInicio(value);

		const horaInicioIndex = opcoesHorarios.indexOf(value);
		const opcoesTermino = opcoesHorarios.slice(horaInicioIndex + 1);
		setHoraTermino(opcoesTermino[0]);

		const date = document.getElementById('date').value;
		const disponivel = await verificarDisponibilidade(date, horaInicio, horaTermino);

		setErroHorarioNaoDisponivel(!disponivel);
	};

	const handleOk = () => {
		setConfirmLoading(true);

		setTimeout(() => {
			onClose();
			message.success('Horário agendado com sucesso', 2);
			setConfirmLoading(false);

			setTimeout(() => {
				window.location.reload();
			}, 2000);
		}, 2000);
	};

	const handleCancel = () => {
		onClose();
	};

	const onFinish = values => {
		console.log('Form values:', values);
	};

	const handleBusca = value => {
		axios
			.get(`http://localhost:5000/clientes?search=${value}`)
			.then(response => {
				if (response.status === 200) {
					return response.data.clients;
				} else {
					throw new Error(`Erro na requisição: ${response.status}`);
				}
			})
			.then(data => {
				const clientesFiltrados = data.filter(cliente => cliente.nomeCompleto.toLowerCase().includes(value.toLowerCase()));

				clientesFiltrados.sort((a, b) => a.nomeCompleto.localeCompare(b.nomeCompleto));
				setClientesFiltrados(clientesFiltrados);
			})
			.catch(error => {
				console.error('Erro na requisição:', error);
			});
	};

	const handleClienteSelect = clienteId => {
		setClienteSelecionado(clienteId);
	};

	const disableDate = current => {
		return current && current.isBefore(dayjs(), 'day');
	};

	const handleAgendamento = async () => {
		try {
			const date = document.getElementById('date').value;

			if (!clienteSelecionado || !date || !horaInicio || !horaTermino) {
				message.error('Preencha todos os campos');
				console.error('Por favor, preencha todos os campos.');
				return;
			}

			let valor;
			if (modalidade === 'BeachTênis') {
				valor = calcularValorBeach(horaInicio, horaTermino, valorHoraBeach);
			} else {
				valor = calcularValor(horaInicio, horaTermino);
			}

			const data = {
				date,
				modalidade,
				horaInicio,
				horaTermino,
				clientId: clienteSelecionado,
				valor,
			};

			const response = await axios.post('http://localhost:5000/novoAgendamento', data);

			if (response.status >= 200 && response.status < 300) {
				handleOk();
			} else {
				console.log('resposta do else', response);
				const errorMessage = response.data.message;
				message.error(errorMessage, 2);
			}
		} catch (error) {
			message.error('Horário indisponível', 2);
			console.error('Erro ao agendar', error);
		}
	};

	const calcularValor = (horaInicio, horaTermino) => {
		const [horaInicioHora, horaInicioMin] = horaInicio.split(':');
		const [horaTerminoHora, horaTerminoMin] = horaTermino.split(':');
		const horas = parseInt(horaTerminoHora, 10) - parseInt(horaInicioHora, 10);
		const minutos = parseInt(horaTerminoMin, 10) - parseInt(horaInicioMin, 10);

		const valor = horas * 50 + (minutos / 60) * 50;
		return valor;
	};

	const calcularValorBeach = (horaInicio, horaTermino) => {
		const [horaInicioHora, horaInicioMin] = horaInicio.split(':');
		const [horaTerminoHora, horaTerminoMin] = horaTermino.split(':');
		const horas = parseInt(horaTerminoHora, 10) - parseInt(horaInicioHora, 10);
		const minutos = parseInt(horaTerminoMin, 10) - parseInt(horaInicioMin, 10);

		const valor = horas * 60 + (minutos / 60) * 60;
		return valor;
	};
	return (
		<Modal
			title='Agendar horários'
			open={true}
			onOk={handleAgendamento}
			okText={'Agendar'}
			confirmLoading={confirmLoading}
			onCancel={handleCancel}
			cancelText='Cancelar'
			style={{ height: '50vh' }}
			bodyStyle={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<h3 className='p-1'>Agende o horário do cliente</h3>
			<div className={styles.formModal}>
				<ConfigProvider locale={ptBR}>
					<Form onFinish={onFinish}>
						<div className={styles.controlSelect}>
							<AutoComplete
								options={clientesFiltrados.map(cliente => ({
									value: cliente.nomeCompleto,
									label: cliente.nomeCompleto,
								}))}
								onSelect={handleClienteSelect}
								onSearch={handleBusca}
								placeholder='Digite o nome do cliente'
								style={{ width: 300 }}
								id='listaClientes'
							/>
						</div>

						<Form.Item name='date' id='date'>
							<DatePicker format='DD/MM/YYYY' disabledDate={disableDate} />
						</Form.Item>

						<Select value={modalidade} style={{ width: 150 }} onChange={value => setModalidade(value)} required>
							<Select.Option key='selecione' value='' disabled>
								Modalidade
							</Select.Option>
							<Select.Option key='futsal' value='Futsal'>
								Futsal
							</Select.Option>
							<Select.Option key='BeachTennis' value='BeachTênis'>
								BeachTênis
							</Select.Option>
							<Select.Option key='volei' value='Vôlei'>
								Vôlei
							</Select.Option>
						</Select>
						<div className={styles.horario_Legend}>
							<span>Horário</span>
						</div>

						<div className={styles.horario_control}>
							<Select
								value={horaInicio}
								onChange={handleHoraInicioChange}
								placeholder='Horário de Início'
								style={{ width: 150 }}
							>
								{opcoesHorarios.map(horario => (
									<Select.Option key={horario} value={horario}>
										{horario}
									</Select.Option>
								))}
							</Select>

							<p>Até</p>
							<Select
								value={horaTermino}
								placeholder='Horário de Término'
								disabled={!horaInicio}
								style={{ width: 150 }}
								onChange={value => setHoraTermino(value)}
							>
								{horaTermino &&
									opcoesHorarios
										.filter(horario => opcoesHorarios.indexOf(horario) > opcoesHorarios.indexOf(horaInicio))
										.map(horario => (
											<Select.Option key={horario} value={horario}>
												{horario}
											</Select.Option>
										))}
							</Select>
						</div>

						{erroHorarioNaoDisponivel && <div className='alert'>Horário não disponível, escolha outro horário.</div>}
					</Form>
				</ConfigProvider>
			</div>
		</Modal>
	);
};

export default InserirHorario;
