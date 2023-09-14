import React, { useState, useEffect } from "react";
import SearchResults from "./SearchResults";
import { Button, Modal, Form, Input, DatePicker, ConfigProvider } from "antd";
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
  const [dataAgendamento, setDataAgendamento] = useState("");

  const handleOk = () => {
    setModalText("Agendando...");
    setConfirmLoading(true);
    setTimeout(() => {
      onClose();
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    onClose();
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
    // Coloque sua lógica de agendamento aqui
  };

  const handleBusca = (value) => {
    setBusca(value); // Atualize o estado 'busca' com o valor do campo de entrada

    if (!value) {
      setClientesFiltrados([]); // Limpe os resultados se a busca estiver vazia
      return;
    }

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

  const fetchDataAgendamento = () => {};
  const fetchHorarioJogo = () => {};

  return (
    <Modal
      title="Agendar horários"
      open={true}
      onOk={handleOk}
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
            {/* Input para "Digite o nome do cliente" */}
            <Input
              placeholder="Digite o nome do cliente"
              value={busca}
              onChange={(e) => handleBusca(e.target.value)}
            />
            {/* SearchResults para exibir os resultados */}
            <SearchResults
              name="cliente"
              clientes={clientesFiltrados}
              onSelect={handleClienteSelect}
            />
            <Form.Item name="data">
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>

            <div className={styles.horario_Legend}>
              <span>Horário</span>
            </div>

            <div className={styles.horario_control}>
              <Input placeholder="Inicio do jogo" />
              <p>até</p>
              <Input placeholder="Final do jogo" />
            </div>
          </Form>
        </ConfigProvider>
      </div>
    </Modal>
  );
};

export default InserirHorario;
