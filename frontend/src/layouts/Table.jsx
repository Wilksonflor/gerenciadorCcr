import React from "react";
import styles from './Table.module.css'

const Table = () => {
  const data = [
   {
    telefone: 1111,
   }
  ];

  return (
    <div>
    <table  className={styles.table}>
      <thead>
        <tr>
          <th>Responsável</th>
          <th>Data do jogo</th>
          <th>Horário de inicio</th>
          <th>Horário final</th>
          <th>Valor</th>
          <th>
          Telefone para contato

          </th>
        </tr>
      </thead>
      <tbody >
        {data.map((item) => (
          <tr key={item.id}>
            {/* <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.email}</td>
            <td>{item.email}</td>
            <td>{item.email}</td>
            <td>{item.telefone}</td>
             */}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Table;
