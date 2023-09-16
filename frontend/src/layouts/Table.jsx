import React,{useState, useEffect} from "react";
import axios from 'axios'
import styles from './Table.module.css'
const Table = () => {

  const [user, setUser] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:5000/horarios/:id')
    .then((response) =>{
      setUser(response.data)
    })
    .catch((error) =>{
      console.log('error', error)
    })
  },[])
  // const fetchUsers = () =>{
    
  // }
  const data = [
   {
    name: "Wilkson",
    dataJogo: "01/08/2023",
    horaInicio: "19:00",
    horaTermino: "21:00",
    valor: 50,
    telefone: 1111,
   },
   {
    name: "Wilkson",
    dataJogo: "01/08/2023",
    horaInicio: "19:00",
    horaTermino: "21:00",
    valor: 50,
    telefone: 1111,
   }
  ];

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
          {data.map((item, index) => (
            <tr key={index}> 
              <td>{item.name}</td>
              <td>{item.dataJogo}</td>
              <td>{item.horaInicio}</td>
              <td>{item.horaTermino}</td>
              <td>R$ {item.valor},00</td>
              <td>{item.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
