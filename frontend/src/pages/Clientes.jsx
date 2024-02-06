/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import Navbar from '../components/NavBar';
import styles from '../layouts/Table.module.css';
import btnStyle from './Clientes.module.css';
import { Button, Space, Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import ClientList from '../components/ClientList';
import useForm from '../useForm';
import MaskedInput from '../components/MaskedInput';
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../../fonts/vfs_fonts';

const Clientes = () => {
	const [size] = useState('large');
	const [clientes, setClientes] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	// const [successMessageVisible, setSuccessMessageVisible] = useState(false);
	const [clienteToDelete, setClienteToDelete] = useState(null);
	const [clienteEditForm] = Form.useForm();
	const [clienteForm] = Form.useForm();
	const [editedCliente, setEditedCliente] = useState(null);
	const { inputValues, handleInputChange, resetForm, form } = useForm(
		{
			nomeCompleto: '',
			contato: '',
			observacoes: '',
		},
		clienteForm,
	);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get('http://localhost:5000/clientes');
			setClientes(response.data.clients);
		} catch (error) {
			console.error('Erro ao obter clientes:', error);
		}
	};

	const adicionarCliente = () => {
		setModalVisible(true);
		clienteForm.resetFields();
	};

	const handleModalOk = async () => {
		try {
			clienteForm.validateFields().then(async values => {
				await axios
					.post('http://localhost:5000/novoCliente', values)
					.then(response => {
						axios
							.get('http://localhost:5000/clientes')
							.then(response => {
								setClientes([...clientes, response.data]);
								clienteForm.resetFields();
								setModalVisible(false);
								showSuccessMessage();
							})
							.catch(error => {
								console.error('Erro ao obter clientes', error);
							});
					})
					.catch(error => {
						console.error('Erro ao criar cliente', error);
					});
			});
		} catch (error) {
			console.error('Erro ao criar cliente', error);
		}
	};

	const handleModalCancel = () => {
		setModalVisible(false);
	};

	const showSuccessMessage = () => {
		message.success('Cliente criado com sucesso!');

		setTimeout(() => {
			window.location.reload();
		}, 2000);
	};

	const handleEdit = cliente => {
		setEditedCliente(cliente);
		setEditModalVisible(true);

		clienteEditForm.setFieldsValue({
			nomeCompleto: cliente.nomeCompleto,
			contato: cliente.contato,
			observacoes: cliente.observacoes,
		});
	};

	const handleSaveEdit = async () => {
		try {
			const response = await axios.put(`http://localhost:5000/clientes/${editedCliente._id}`, {
				nomeCompleto: clienteEditForm.getFieldValue('nomeCompleto'),
				contato: clienteEditForm.getFieldValue('contato'),
				observacoes: clienteEditForm.getFieldValue('observacoes'),
			});

			if (response.status === 200) {
				setTimeout(() => {
					window.location.reload();
				}, 2000);
				message.success('Cliente atualizado');
				setEditModalVisible(false);
			}
		} catch (error) {
			console.error('Erro ao editar cliente', error);
		}
	};

	const handleCancelDelete = () => {
		setDeleteModalVisible(false);
	};

	const handleDelete = cliente => {
		setClienteToDelete(cliente);
		setDeleteModalVisible(true);
	};

	const handleConfirmDelete = async () => {
		try {
			await axios.delete(`http://localhost:5000/clientes/${clienteToDelete._id}`);

			const updatedClientes = clientes.filter(c => c._id !== clienteToDelete._id);
			setClientes(updatedClientes);

			message.success('Cliente excluído com sucesso!');
		} catch (error) {
			console.error('Erro ao excluir cliente', error);
			message.error('Erro ao excluir cliente');
		} finally {
			setDeleteModalVisible(false);
		}
	};

	const handleRelatorio = () => {
		pdfMake.vfs = pdfFonts;

		const docDefinition = {
			content: [
				{ text: 'Relatório de todos os clientes', style: 'header' },
				{
					style: 'tableExample',
					table: {
						alignment: 'center',
						headerRows: 1,
						widths: [180, 120, 150],
						body: [
							[
								{ text: 'Cliente', style: 'tableHeader' },
								{ text: 'Contato', style: 'tableHeader' },
								{ text: 'Observações', style: 'tableHeader' },
							],
							...clientes.map(cliente => [
								{ text: cliente.nomeCompleto },
								{ text: cliente.contato },
								{ text: cliente.observacoes || '' },
							]),
						],
					},
				},
			],
			styles: {
				header: {
					fontSize: 18,
					bold: true,
					alignment: 'center',
					margin: [0, 0, 0, 20],
				},
				tableExample: {
					margin: [20, 20, 0, 20],
				},
				tableHeader: {
					alignment: 'center',
					bold: true,
					fontSize: 13,
					color: 'black',
				},
			},
		};
		const pdfDoc = pdfMake.createPdf(docDefinition);
		pdfDoc.open();
	};

	const handleRelatorioCliente = async clienteId => {
		pdfMake.vfs = pdfFonts;

		try {
			const response = await axios.get(`http://localhost:5000/clientes/relatorio/${clienteId}`);
			const { clienteComAgendamento } = response.data;
			const { client, agendamentos } = clienteComAgendamento;

			if (!client) {
				console.log('cliente não encontrado');
				return;
			}

			const somaValores = agendamentos.reduce((total, agendamento) => {
				return total + (agendamento.valor || 0);
			}, 0);

			const docDefinition = {
				content: [
					{
						alignment: 'center',
						text: `Relatório de agendamentos de ${client.nomeCompleto}`,
						style: 'header',
						width: [100, 100, 100],
					},
					{
						margin: [0, 0, 0, 20],
						style: 'tableExample',
						table: {
							headerRows: 1,
							widths: [150, 100, 100, 80],
							body: [
								[
									{
										text: 'Data de Agendamento',
										style: 'tableHeader',
									},

									{
										text: 'Hora de Início',
										style: 'tableHeader',
									},
									{
										text: 'Hora de Término',
										style: 'tableHeader',
									},
									{
										text: 'Valor',
										style: 'tableHeader',
									},
								],
								...agendamentos.map(agendamento => [
									agendamento.date,
									agendamento.horaInicio,
									agendamento.horaTermino,

									{
										text: `R$ ${agendamento.valor ? agendamento.valor.toLocaleString('pt-BR') : ''},00`,
										style: 'currency',
										currency: 'BRL',
									},
								]),
								[
									{ text: 'Total', style: 'tableHeader' },
									'',
									'',
									{
										text: `R$ ${somaValores.toFixed(2)}`,
										style: 'currency',
										currency: 'BRL',
										bold: true,
									},
								],
							],
						},
					},
				],
				styles: {
					header: {
						fontSize: 16,
						bold: true,
						alignment: 'center',
						margin: [5, 15, 0, 20],
					},
					tableExample: {
						margin: [0, 20, 0, 8],
						alignment: 'center',
					},
					tableHeader: {
						bold: true,
						fontSize: 13,
						color: 'black',
					},
				},
			};
			const pdfDoc = pdfMake.createPdf(docDefinition);
			pdfDoc.open();
		} catch (error) {
			console.log('Erro ao gerar o relatório do cliente', error);
		}
	};

	return (
		<>
			<Navbar />

			<div className={btnStyle.containerBtn}>
				<div className=''>
					<Space wrap>
						<Button type='primary' icon={<UserAddOutlined />} size={size} onClick={adicionarCliente}>
							Adicionar cliente
						</Button>
					</Space>
				</div>

				<div className=''>
					<Space wrap>
						<Button
							type='button'
							className='btn btn-info w-100'
							icon={<DescriptionIcon />}
							size={size}
							onClick={handleRelatorio}
						>
							Lista de clientes
						</Button>
					</Space>
				</div>
			</div>

			{/* Tabela de clientes */}
			<div className='container-lg'>
				<table className={`${styles.table} responsive-table`}>
					<thead>
						<tr>
							<th>Cliente</th>
							<th>Contato</th>
							<th>Observações</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						{clientes.length > 0 ? (
							clientes.map((cliente, index) => (
								<ClientList
									key={index}
									cliente={cliente}
									onEdit={handleEdit}
									onDelete={handleDelete}
									onSave={() => {
										handleRelatorioCliente(cliente._id);
									}}
								/>
							))
						) : (
							<tr key='SemClientes'>
								<td colSpan='7'>Não há nenhum cliente</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Modal "Adicionar Cliente" */}
			<Modal
				title='Adicionar Cliente'
				open={modalVisible}
				onOk={handleModalOk}
				onCancel={handleModalCancel}
				footer={null}
				width={650}
				destroyOnClose
			>
				<Form form={clienteForm} onFinish={handleModalOk} layout='vertical'>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div style={{ marginBottom: 12, width: 500 }}>
							<Form.Item
								label='Cliente'
								name='nomeCompleto'
								value={inputValues.nomeCompleto}
								onChange={handleInputChange}
								rules={[
									{
										required: true,
										message: 'Por favor, insira o nome do cliente',
									},
								]}
							>
								<Input />
							</Form.Item>
						</div>
						<div style={{ marginBottom: 16 }}>
							<Form.Item
								label='Telefone para contato'
								name='contato'
								value={inputValues.contato}
								onChange={handleInputChange}
								rules={[
									{
										required: true,
										message: 'Por favor, insira o contato do cliente',
									},
									{
										min: 8,
										message: 'A senha deve ter mais de 8 caracteres',
									},
								]}
							>
								<MaskedInput />
							</Form.Item>
						</div>

						<div style={{ marginBottom: 16 }}>
							<Form.Item
								label='Observações'
								name='observacoes'
								value={inputValues.observacoes}
								onChange={handleInputChange}
								rules={[
									{
										required: false,
										message: 'Por favor, insira este campo',
									},
								]}
							>
								<Input />
							</Form.Item>
						</div>
						<Form.Item>
							<Button type='primary' htmlType='submit'>
								Salvar
							</Button>
						</Form.Item>
					</div>
				</Form>
			</Modal>

			{/* Modal "Editar Cliente" */}
			<Modal
				title='Editar Cliente'
				open={editModalVisible}
				onOk={handleSaveEdit}
				onCancel={() => setEditModalVisible(false)}
				footer={null}
				width={650}
				destroyOnClose
			>
				<Form form={clienteEditForm} onFinish={handleSaveEdit} layout='vertical'>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div style={{ marginBottom: 12, width: 500 }}>
							<Form.Item
								label='Cliente'
								name='nomeCompleto'
								rules={[
									{
										required: true,
										message: 'Por favor, insira o nome do cliente',
									},
								]}
							>
								<Input />
							</Form.Item>
						</div>
						<div style={{ marginBottom: 16 }}>
							<Form.Item
								label='Telefone para contato'
								name='contato'
								rules={[
									{
										required: true,
										message: 'Por favor, insira o contato do cliente',
									},
								]}
							>
								<MaskedInput />
							</Form.Item>
						</div>

						<div style={{ marginBottom: 16 }}>
							<Form.Item
								label='Observações'
								name='observacoes'
								rules={[
									{
										required: false,
										message: 'Por favor, insira este campo',
									},
								]}
							>
								<Input />
							</Form.Item>
						</div>
						<Form.Item>
							<Button type='primary' htmlType='submit'>
								Salvar
							</Button>
						</Form.Item>
					</div>
				</Form>
			</Modal>

			{/* Modal de confirmação de exclusão */}
			<Modal
				title='Confirmar Exclusão'
				open={deleteModalVisible}
				onOk={handleConfirmDelete}
				onCancel={handleCancelDelete}
				okText='Sim'
				cancelText='Não'
			>
				Tem certeza que deseja excluir este cliente?
			</Modal>
		</>
	);
};

export default Clientes;
