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
  AutoComplete,
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
  const [erroHorarioNaoDisponivel, setErroHorarioNaoDisponivel] =
    useState(false); // Estado para controlar a exibição da mensagem de erro
  const customTimeFormat = "HH:mm";

  const handleOk = () => {
    setModalText("Agendando...");
    setConfirmLoading(true);

    setTimeout(() => {
      onClose();
      message.success("Horário agendado com sucesso", 2);
      setConfirmLoading(false);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
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
        const clientesFiltrados = data.filter((cliente) =>
          cliente.nomeCompleto.toLowerCase().includes(value.toLowerCase())
        );

        clientesFiltrados.sort((a, b) =>
          a.nomeCompleto.localeCompare(b.nomeCompleto)
        );
        setClientesFiltrados(clientesFiltrados);
        // console.log("Dados da resposta:", data);
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

      if (!clienteSelecionado || !date || !horaInicio || !horaTermino) {
        console.error("Por favor, preencha todos os campos.");
        return;
      }

      if (horaTermino <= horaInicio) {
        console.log("hora de termino deve ser maior que a de inicio");
        message.error("Insira um horário final superior ao inicial", 2);
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

      const response = await axios.post(
        "http://localhost:5000/novoAgendamento",
        data
      );

      // console.log("resposta", response);
      if (response.status >= 200 && response.status < 300) {
        handleOk();
      } else {
        console.log('resposta do else', response)
        const errorMessage = response.data.message;
        message.error(errorMessage, 2);
      }
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
            <div className={styles.controlSelect}>
              <AutoComplete
                options={clientesFiltrados.map((cliente) => ({
                  value: cliente.nomeCompleto,
                  label: cliente.nomeCompleto,
                }))}
                onSelect={handleClienteSelect}
                onSearch={handleBusca}
                placeholder="Digite o nome do cliente"
                style={{ width: 300 }}
                id="listaClientes"
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
                required
              />

              <p>até</p>

              <input type="time" name="horaTermino" id="horaTermino" required />
            </div>

            {erroHorarioNaoDisponivel && (
              <div className="alert">
                Horário não disponível, escolha outro horário.
              </div>
            )}
          </Form>
        </ConfigProvider>
      </div>
    </Modal>
  );
};

export default InserirHorario;
