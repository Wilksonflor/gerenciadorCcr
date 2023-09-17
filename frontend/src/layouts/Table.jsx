import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Table.module.css";

const Table = () => {
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    fetchHorarios();
  }, []);

  const fetchHorarios = async () => {
    try {
      const response = await axios.get("http://localhost:5000/horarios");
      console.log('Resposta do Axios', response);
      setHorarios(response.data);
    } catch (error) {
      console.log("Erro ao obter resposta do servidor para horários", error);
    }
  };

  console.log("O componente Table está sendo renderizado.");
  console.log("A função fetchHorarios foi chamada.");
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Data do jogo</th>
            <th>Horário de inicio</th>
            <th>Horário final</th>
            <th>Valor</th>
            <th>Telefone para contato</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario, index) => (
            <tr key={index}>
              <td>{horario.nomeCompleto ? horario.client.nomeCompleto : ""}</td>
              <td>{horario.date}</td>
              <td>{horario.horaInicio}</td>
              <td>{horario.horaTermino}</td>
              <td>R$ {horario.valor},00</td>
              <td>{horario.client ? horario.client.contato : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
