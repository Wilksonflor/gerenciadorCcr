/* eslint-disable indent */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WhatsAppOutlined } from '@ant-design/icons';
import { DatePicker, message, Button } from 'antd';
import axios from 'axios';
import styles from './Table.module.css';

const Table = () => {
	const [horarios, setHorarios] = useState([]);
	const [horarioFiltrado, setHorarioFiltrado] = useState([]);
	const [selectedDate, setSelectedDate] = useState(null);

	useEffect(() => {
		fetchHorarios();
	}, []);

	const fetchHorarios = async () => {
		try {
			const response = await axios.get('http://localhost:5000/horarios');
			setHorarios(response.data);
			setHorarioFiltrado(response.data);
		} catch (error) {
			console.log('Erro ao obter resposta do servidor para horários', error);
		}
	};

	const formatPhoneNumber = phoneNumber => {
		const formattedNumber = phoneNumber.replace(/\D/g, '');
		return formattedNumber;
	};

	const handleFilterDate = async () => {
		if (!selectedDate) {
			message.error('Selecione uma data!');
			return;
		}

		try {
			const formattedDate = selectedDate.format('DD-MM-YYYY');
			const response = await axios.get(`http://localhost:5000/horarios/dataJogo/${formattedDate}`);

			console.log('Resposta do backend:', response.data);
			setHorarioFiltrado(response.data);
		} catch (error) {
			console.log('Erro ao filtrar os horários', error);
		}
	};

	const horariosFiltrados = horarioFiltrado.filter(horario => horario.client);

	return (
		<>
			<div className={styles.containerTable}>
				<div>
					<p>Filtre por datas</p>
					<DatePicker format='DD/MM/YYYY' placeholder='Selecionar data' onChange={date => setSelectedDate(date)} />

					<Button onClick={handleFilterDate}>Filtrar</Button>
				</div>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Cliente</th>
							<th>Data do jogo</th>
							<th>Modalidade</th>
							<th>Horário de inicio</th>
							<th>Horário final</th>
							<th>Valor</th>
							<th>Telefone para contato</th>
						</tr>
					</thead>
					<tbody>
						{horariosFiltrados.length === 0
							? horarios.map((horario, index) => (
									<tr key={index}>
										<td>{horario.client.nomeCompleto}</td>
										<td>{horario.date}</td>
										<td>{horario.modalidade}</td>
										<td>{horario.horaInicio}</td>
										<td>{horario.horaTermino}</td>
										<td>{horario.valor !== undefined ? `R$ ${horario.valor.toFixed(2)}` : 'Valor não definido'}</td>
										<td>
											<WhatsAppOutlined style={{ color: '#25d366', fontSize: '24px' }} />
											<Link
												to={`https://api.whatsapp.com/send?phone=55${formatPhoneNumber(horario.client.contato)}`}
												target='_blank'
											>
												{horario.client.contato}
											</Link>
										</td>
									</tr>
							  ))
							: horarioFiltrado.map((horario, index) => (
									<tr key={index}>
										<td>{horario.client.nomeCompleto}</td>
										<td>{horario.date}</td>
										<td>{horario.modalidade}</td>
										<td>{horario.horaInicio}</td>
										<td>{horario.horaTermino}</td>
										<td>{horario.valor !== undefined ? `R$ ${horario.valor.toFixed(2)}` : 'Valor não definido'}</td>
										<td>
											<WhatsAppOutlined style={{ color: '#25d366', fontSize: '24px' }} />
											<Link
												to={`https://api.whatsapp.com/send?phone=55${formatPhoneNumber(horario.client.contato)}`}
												target='_blank'
											>
												{horario.client.contato}
											</Link>
										</td>
									</tr>
							  ))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Table;
