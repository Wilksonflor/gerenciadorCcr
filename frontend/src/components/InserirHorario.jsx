import React, { useState, useEffect } from "react";
import SearchResults from "./SearchResults";
import {
  Button,
  TimePicker,
  Modal,
  Form,
  Input,
  DatePicker,
  ConfigProvider,
  message,
} from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import styles from "./InserirHorario.module.css";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const InserirHorario = ({ onClose }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [busca, setBusca] = useState("");
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const customTimeFormat = "HH:mm";

  const handleOk = () => {
    setModalText("Agendando...");
    setConfirmLoading(true);
    setTimeout(() => {
      onClose();
      message.success("Horário agendado com sucesso");
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    onClose();
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const handleBusca = (value) => {
    setBusca(value);

    // if (!value) {
    //   setClientesFiltrados([]);
    //   return;
    // }

    axios
      .get(`http://localhost:5000/clientes?search=${value}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data.clients;
        } else {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
      })
      .then((data) => {
        setClientesFiltrados(data);
        console.log("Dados da resposta:", data);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  };

  const handleClienteSelect = (clienteId) => {
    setClienteSelecionado(clienteId);
  };

  const disableDate = (current) => {
    return current && current.isBefore(dayjs(), "day");
  };

  const handleAgendamento = async () => {
    try {
      const date = document.getElementById("date").value;
      const horaInicio = document.getElementById("horaInicio").value;
      const horaTermino = document.getElementById("horaTermino").value;

      // Validação que todos os campoos precisam ser preenchidos
      if (!clienteSelecionado || !date || !horaInicio || !horaTermino) {
        console.error("Por favor, preencha todos os campos.");
        return;
      }

      const valor = calcularValor(horaInicio, horaTermino);

      const data = {
        date,
        horaInicio,
        horaTermino,
        clientId: clienteSelecionado,
        valor,
      };
      console.log("data", data);
      const response = await axios.post(
        "http://localhost:5000/novoAgendamento",
        data
      );

      console.log("Agendado com sucesso", response.data);
      handleOk();
    } catch (error) {
      console.error("Erro ao agendar", error);
    }
  };

  const calcularValor = (horaInicio, horaTermino) => {
    const [horaInicioHora, horaInicioMin] = horaInicio.split(":");
    const [horaTerminoHora, horaTerminoMin] = horaTermino.split(":");

    const horas = parseInt(horaTerminoHora, 10) - parseInt(horaInicio, 10);
    const minutos = parseInt(horaTerminoMin, 10) - parseInt(horaInicioMin, 10);

    const valor = horas * 50 + (minutos / 60) * 50;
    return valor;
  };

  return (
    <Modal
      title="Agendar horários"
      open={true}
      onOk={handleAgendamento}
      okText={"Agendar"}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      cancelText="Cancelar"
      style={{ height: "50vh" }}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h3 className="p-1">Agende o horário do cliente</h3>
      <div className={styles.formModal}>
        <ConfigProvider locale={ptBR}>
          <Form onFinish={onFinish}>
            <Input
              placeholder="Digite o nome do cliente"
              value={busca}
              onChange={(e) => handleBusca(e.target.value)}
              id="clienteInput"
            />
            <div className={styles.controlSelect}>
              <SearchResults
                name="cliente"
                id="cliente"
                clientes={clientesFiltrados}
                onSelect={handleClienteSelect}
              />
            </div>

            <Form.Item name="date" id="date">
              <DatePicker format="DD/MM/YYYY" disabledDate={disableDate} />
            </Form.Item>

            <div className={styles.horario_Legend}>
              <span>Horário</span>
            </div>

            <div className={styles.horario_control}>
       
              <input 
              type="time" 
              name="horaInicio" 
              id="horaInicio"
              placeholder="Inicio" 
              required />

              <p>até</p>
          
              <input 
              type="time" 
              name="horaTermino" 
              id="horaTermino" 
              required />
            </div>
          </Form>
        </ConfigProvider>
      </div>
    </Modal>
  );
};

export default InserirHorario;
