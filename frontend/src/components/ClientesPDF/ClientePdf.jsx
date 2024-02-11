// /* eslint-disable linebreak-style */
// import React, { useState } from 'react';
// import axios from 'axios';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';

// const RelatorioClientes = ({ clienteId }) => {
// 	const [idCliente, setIdCliente] = useState(clienteId);

// 	const handleRelatorioCliente = async clienteId => {
// 		pdfMake.vfs = pdfFonts;

// 		try {
// 			const response = await axios.get(`http://localhost:5000/clientes/relatorio/${clienteId}`);
// 			const { clienteComAgendamento } = response.data;
// 			const { client, agendamentos } = clienteComAgendamento;

// 			if (!client) {
// 				console.log('cliente não encontrado');
// 				return;
// 			}

// 			const somaValores = agendamentos.reduce((total, agendamento) => {
// 				return total + (agendamento.valor || 0);
// 			}, 0);

// 			const docDefinition = {
// 				content: [
// 					{
// 						alignment: 'center',
// 						text: `Relatório de agendamentos de ${client.nomeCompleto}`,
// 						style: 'header',
// 						width: [100, 100, 100],
// 					},
// 					{
// 						margin: [0, 0, 0, 20],
// 						style: 'tableExample',
// 						table: {
// 							headerRows: 1,
// 							widths: [150, 100, 100, 80],
// 							body: [
// 								[
// 									{
// 										text: 'Data de Agendamento',
// 										style: 'tableHeader',
// 									},
// 									{
// 										text: 'Hora de Início',
// 										style: 'tableHeader',
// 									},
// 									{
// 										text: 'Hora de Término',
// 										style: 'tableHeader',
// 									},
// 									{
// 										text: 'Modalidade',
// 										style: 'tableHeader',
// 									},
// 									{
// 										text: 'Valor',
// 										style: 'tableHeader',
// 									},
// 								],
// 								...agendamentos.map(agendamento => [
// 									agendamento.date,
// 									agendamento.horaInicio,
// 									agendamento.horaTermino,
// 									agendamento.modalidade,
// 									{
// 										text: `R$ ${agendamento.valor ? agendamento.valor.toLocaleString('pt-BR') : ''},00`,
// 										style: 'currency',
// 										currency: 'BRL',
// 									},
// 								]),
// 								[
// 									{ text: 'Total', style: 'tableHeader' },
// 									'',
// 									'',
// 									{
// 										text: `R$ ${somaValores.toFixed(2)}`,
// 										style: 'currency',
// 										currency: 'BRL',
// 										bold: true,
// 									},
// 								],
// 							],
// 						},
// 					},
// 				],
// 				styles: {
// 					header: {
// 						fontSize: 16,
// 						bold: true,
// 						alignment: 'center',
// 						margin: [5, 15, 0, 20],
// 					},
// 					tableExample: {
// 						margin: [0, 20, 0, 8],
// 						alignment: 'center',
// 					},
// 					tableHeader: {
// 						bold: true,
// 						fontSize: 13,
// 						color: 'black',
// 					},
// 				},
// 			};
// 			const pdfDoc = pdfMake.createPdf(docDefinition);
// 			pdfDoc.open();
// 		} catch (error) {
// 			console.log('Erro ao gerar o relatório do cliente', error);
// 		}
// 	};

// 	return (
// 		<div>
// 			<button onClick={() => handleRelatorioCliente(idCliente)}>Gerar Relatório</button>
// 		</div>
// 	);
// };

// export default RelatorioClientes;
