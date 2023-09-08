import React, { forwardRef, useRef, useEffect } from "react";
import InputMask from "react-input-mask";
import { Input } from "antd";

const MaskedInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (ref) {
      if (typeof ref === "function") {
        ref(inputRef.current);
      } else {
        ref.current = inputRef.current;
      }
    }
  }, [ref]);

  return (
    <InputMask mask="(99) 9999-9999" maskChar="_" {...props}>
      {({ inputRef, ...inputProps }) => (
        <Input {...inputProps} ref={inputRef || inputRef} />
      )}
    </InputMask>
  );
});

export default MaskedInput;
