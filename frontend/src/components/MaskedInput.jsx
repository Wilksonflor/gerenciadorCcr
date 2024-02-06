import React, { forwardRef, useRef, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { Input } from 'antd';

const MaskedInput = forwardRef((props, ref) => {
	const inputRef = useRef(null);

	useEffect(() => {
		if (ref) {
			if (typeof ref === 'function') {
				ref(inputRef.current);
			} else {
				ref.current = inputRef.current;
			}
		}
	}, [ref]);

	return (
		<InputMask mask='(99) 99999-9999' maskChar='_' {...props} ref={inputRef}>
			{inputProps => <Input {...inputProps} />}
		</InputMask>
	);
});

export default MaskedInput;
