import { useState } from "react";

const useForm = (initialState) => {
  const [inputValues, setInputValues] = useState(initialState);

  const resetForm = () => {
    setInputValues(initialState);
  };

  const handleInputChange = ({ target }) => {
    setInputValues({
      ...inputValues,
      [target.name]: target.value,
    });
  };

  return {inputValues, 
    handleInputChange, 
    resetForm};
};

export default useForm;
