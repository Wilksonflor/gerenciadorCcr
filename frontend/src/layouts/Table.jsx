import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Table.module.css";
import { Link } from "react-router-dom";
import { WhatsAppOutlined } from '@ant-design/icons';

const Table = () => {
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    fetchHorarios();
  }, []);

  const fetchHorarios = async () => {
    try {
      const response = await axios.get("http://localhost:5000/horarios");
      console.log("Resposta do Axios", response);
      console.log("Dados recebido da API", response.data);
      setHorarios(response.data);
    } catch (error) {
      console.log("Erro ao obter resposta do servidor para horários", error);
    }
  };

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
          {horarios.length === 0 ? (
            <tr>
              <td colSpan="6">Nenhum horário marcado</td>
            </tr>
          ) : (
            horarios.map((horario, index) => (
              <tr key={index}>
                <td>{horario.client ? horario.client.nomeCompleto : ""}</td>
                <td>{horario.date}</td>
                <td>{horario.horaInicio}</td>
                <td>{horario.horaTermino}</td>
                <td>R$ {horario.valor}Valor</td>
                <td>
                <WhatsAppOutlined style={{ color: '#25d366', fontSize: '24px' }} />
                  <Link
                    to={`https://api.whatsapp.com/send?phone=${
                      horario.client ? horario.client.contato : ""
                    }`}
                    target="_blank"
                  >
                    {horario.client ? horario.client.contato : ""}
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
