import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';

const ClientList = ({ cliente, onEdit, onDelete, onSave }) => {
	return (
		<tr>
			<>
				<td>{cliente.nomeCompleto}</td>
				<td>{cliente.contato}</td>
				<td>{cliente.observacoes}</td>
				<td>
					<div className='d-flex justify-content-center gap-2'>
						<span type='button' className='btn btn-info btn-sm' onClick={() => onEdit(cliente)}>
							<EditIcon />
						</span>
						<span type='button' className='btn btn-danger btn-sm' onClick={() => onDelete(cliente)}>
							<DeleteIcon />
						</span>
						<span type='button' className='btn btn-secondary btn-sm' onClick={() => onSave(cliente)}>
							<DescriptionIcon />
						</span>
					</div>
				</td>
			</>
		</tr>
	);
};

export default ClientList;
