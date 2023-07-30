import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import { ConfigProvider } from "antd";
import styles from "./InserirHorario.module.css";

const InserirHorario = ({ onClose }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleOk = () => {
    setModalText("Agendando...");
    setConfirmLoading(true);
    setTimeout(() => {
      onClose();
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    onClose();
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
    // Aqui vou enviar as informações para o backend
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
      style={{ height: "80vh" }}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h3>Preencha os campos</h3>
      <div className={styles.formModal}>
        <ConfigProvider locale={ptBR}>
          {" "}
          {/* Configurar o idioma para português */}
          <Form onFinish={onFinish}>
            <Form.Item name="responsavel" label="Responsável">
              <Input />
            </Form.Item>
            <Form.Item name="data" label="Selecione a data">
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item label="Horário" name="horario">
              <Input />
            </Form.Item>
            {/* Adicione outros campos do formulário aqui */}
          </Form>
        </ConfigProvider>
      </div>
      <p>{modalText}</p>
    </Modal>
  );
};

export default InserirHorario;
