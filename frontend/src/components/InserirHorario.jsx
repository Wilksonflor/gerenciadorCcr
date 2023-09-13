import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  ConfigProvider,
  TimePicker,
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
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [dataAgendamento, setDataAgendamento] = useState("");

  useEffect(() => {
    fetchClients();
  }, [busca]);

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
    // Colocar a lógica do agendamento ;
  };

  const fetchClients = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/clientes?search=${id}`
      );
      const dadosClientes = response.data.clientes;
      setClientes(dadosClientes);
      console.log("dados do servidor", response.data);

      // Preciso que o dadosClientes seja um Array
      if (Array.isArray(dadosClientes)) {
        const buscaLower = busca.toLowerCase();
        const clientesFiltrados = dadosClientes.filter((cliente) => {
          const clienteNomeLower = cliente.nome.toLowerCase();
          return clienteNomeLower.startsWith(buscaLower);
        });
        setClientesFiltrados(clientesFiltrados);
      } else {
        setClientesFiltrados([]);
      }
    } catch (error) {
      console.log("Erro ao filtrar cliente", error);
    }
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
            <Form.Item name="cliente">
              <Input
                placeholder="Digite o nome do cliente"
                value={busca}
                onChange={(e) => {
                  setBusca(e.target.value);
                }}
                // O datalist
                list="clientes"
              />
            </Form.Item>
            <datalist id="clientes">
              {clientesFiltrados.map((cliente) => (
                <option key={cliente.id} value={cliente.nome} />
              ))}
            </datalist>
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
