import { useState } from "react";

const useForm = (initialState) => {
  const [inputValues, setInputValues] = useState(initialState);

  const resetForm = () => {
    setInputValues(initialState);
  };

  const handleInputChange = ({ target }) => {
    // Obtém o nome e o valor do campo de input
    const { name, value } = target;

    // Exibe os valores no console
    console.log(`Campo: ${name}, Valor: ${value}`);

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  return {
    inputValues,
    handleInputChange,
    resetForm,
  };
};


export default useForm;
