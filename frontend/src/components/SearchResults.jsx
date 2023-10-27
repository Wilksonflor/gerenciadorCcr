import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const SearchResults = ({ clientes, onSelect }) => {
	// if (!clientes || clientes.length === 0) {
	//   return null;
	// }

	return (
		<div>
			<Select
				showSearch
				style={{ width: 300, marginBottom: 20 }}
				placeholder='Selecione o cliente'
				optionFilterProp='children'
				filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
				filterSort={(optionA, optionB) =>
					(optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
				}
				onChange={onSelect}
			>
				{clientes.map(cliente => (
					<Option key={cliente._id} value={cliente._id} label={cliente.nomeCompleto}>
						{cliente.nomeCompleto}
					</Option>
				))}
			</Select>
		</div>
	);
};

export default SearchResults;
