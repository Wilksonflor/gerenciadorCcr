import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfMake/build/vfs_fonts';

const ClientesPdf = clientes => {
	pdfMake.vfs = pdfFonts.pdfMake.vfs;

	const reportTitle = [];
	const details = [];
	const footer = [];

	const docDefinitions = {
		pageSize: 'A4',
		pageMargins: [15, 50, 15, 40],

		header: [reportTitle],
		content: [details],
		footer: [footer],
	};

	clientes.forEach(cliente => {
		details.push({ text: `Cliente: ${cliente.nomeCompleto}` });
		details.push({ text: `Contato: ${cliente.contato}` });
		details.push({ text: `Modalidade: ${cliente.modalidade}` });
		details.push({ text: `Observações: ${cliente.observacoes} || "N/A` });
	});
	pdfMake.createPdf(docDefinitions).download();
};

export default ClientesPdf;
