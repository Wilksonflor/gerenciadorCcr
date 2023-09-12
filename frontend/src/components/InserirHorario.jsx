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
    // Colocar a lógica do timerModel;
  };

  const fetchClients = () => {};
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
                  filterClientes(); // Aplicando o filtro quando digita
                }}
              />
            </Form.Item>
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
