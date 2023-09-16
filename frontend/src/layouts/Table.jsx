import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Table.module.css";

const Table = () => {
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/horarios")
      .then((response) => {
        setHorarios(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Responsável</th>
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
              <td>{horario.client.nomeCompleto}</td>
              <td>{horario.date}</td>
              <td>{horario.horaInicio}</td>
              <td>{horario.horaTermino}</td>
              <td>R$ {horario.valor},00</td>{" "}
              {/* Suponha que o valor venha do objeto de horário */}
              <td>{horario.client.contato.telefone}</td>{" "}
              {/* Suponha que o telefone venha do objeto de cliente */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
