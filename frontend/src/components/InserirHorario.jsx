import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, DatePicker } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import { ConfigProvider, TimePicker } from "antd";
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



  const onChange = (time, timeString) => {
    console.log(time, timeString);
  };

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

  const filterClientes = () => {
    const filtered = clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(busca.toLowerCase())
    );
    setClientesFiltrados(filtered);
  };

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
                value={busca}
                placeholder="Digite o nome do cliente"
                onChange={(e) => {
                  setBusca(e.target.value);
                  filterClientes(); // Aplica o filtro quando o usuário digitar algo
                }}
              />
            </Form.Item>
            <Form.Item name="data">
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>

            <Form.Item name="horaInicio">
              <TimePicker
                format="HH:mm"
                onChange={onChange}
                initialValues={dayjs("00:00", "HH:mm")}
              />
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
      <p>{modalText}</p>
      {/* Exibir os clientes filtrados */}
      {clientesFiltrados.map((cliente) => (
        <div key={cliente.id}>{cliente.nome}</div>
      ))}
    </Modal>
  );
};

export default InserirHorario;
