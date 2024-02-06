/* eslint-disable linebreak-style */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import InputMask from 'react-input-mask';
import { Input } from 'antd';

const MaskedInput = forwardRef((props, ref) => {
	return (
		<InputMask mask='(99) 99999-9999' maskChar='_' {...props} ref={ref} className='ant-input'>
			{inputProps => <Input {...inputProps} />}
		</InputMask>
	);
});

export default MaskedInput;
