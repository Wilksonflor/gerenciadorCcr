import React, { forwardRef } from 'react';
import InputMask from 'react-input-mask';

const MaskedInput = forwardRef((props, ref) => {
	return <InputMask mask='(99) 99999-9999' maskChar='_' {...props} ref={ref} />;
});

export default MaskedInput;
