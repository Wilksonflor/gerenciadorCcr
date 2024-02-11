// /* eslint-disable linebreak-style */
// import React from 'react';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';

// const TodosOsClientesPDF = ({ clientes }) => {
// 	const handleRelatorio = () => {
// 		pdfMake.vfs = pdfFonts;

// 		const docDefinition = {
// 			content: [
// 				{ text: 'Relatório de todos os clientes', style: 'header' },
// 				{
// 					style: 'tableExample',
// 					table: {
// 						alignment: 'center',
// 						headerRows: 1,
// 						widths: [180, 120, 150],
// 						body: [
// 							[
// 								{ text: 'Cliente', style: 'tableHeader' },
// 								{ text: 'Contato', style: 'tableHeader' },
// 								{ text: 'Observações', style: 'tableHeader' },
// 							],
// 							...clientes.map(cliente => [
// 								{ text: cliente.nomeCompleto },
// 								{ text: cliente.contato },
// 								{ text: cliente.observacoes || '' },
// 							]),
// 						],
// 					},
// 				},
// 			],
// 			styles: {
// 				header: {
// 					fontSize: 18,
// 					bold: true,
// 					alignment: 'center',
// 					margin: [0, 0, 0, 20],
// 				},
// 				tableExample: {
// 					margin: [20, 20, 0, 20],
// 				},
// 				tableHeader: {
// 					alignment: 'center',
// 					bold: true,
// 					fontSize: 13,
// 					color: 'black',
// 				},
// 			},
// 		};
// 		const pdfDoc = pdfMake.createPdf(docDefinition);
// 		pdfDoc.open();
// 	};

// 	return (
// 		<div>
// 			<button onClick={handleRelatorio}>Gerar Relatório</button>
// 		</div>
// 	);
// };

// export default TodosOsClientesPDF;
