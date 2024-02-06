/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Table.module.css';
import { Link } from 'react-router-dom';
import { WhatsAppOutlined } from '@ant-design/icons';

const Table = () => {
	const [horarios, setHorarios] = useState([]);

	useEffect(() => {
		fetchHorarios();
	}, []);

	const fetchHorarios = async () => {
		try {
			const response = await axios.get('http://localhost:5000/horarios');

			setHorarios(response.data);
		} catch (error) {
			console.log('Erro ao obter resposta do servidor para horários', error);
		}
	};
	const formatPhoneNumber = phoneNumber => {
		const formattedNumber = phoneNumber.replace(/\D/g, '');
		return formattedNumber;
	};

	//
	const horariosFiltrados = horarios.filter(horario => horario.client);

	return (
		<div className={styles.containerTable}>
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
					{horariosFiltrados.length === 0 ? (
						<tr>
							<td colSpan='7'>Nenhum horário marcado</td>
						</tr>
					) : (
						horariosFiltrados.map((horario, index) => (
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
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
