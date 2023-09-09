import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import { ConfigProvider, TimePicker } from "antd";
import styles from "./InserirHorario.module.css";
import axios from "axios";
import { debounce } from "lodash";

const InserirHorario = ({ onClose }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [busca, setBusca] = useState("");
  const [responsaveisEncontrados, setResponsaveisEncontrados] = useState([]);

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
    // Colocar a logica do timerModel;
  };


  

  const searchClient = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/clientes/${busca}`);
      if (response.data && response.data.users) {
        setResponsaveisEncontrados(response.data.users);
      } else {
        setResponsaveisEncontrados([]);
      }
    } catch (error) {
      console.log("error", error);
    }
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
      <h3>Preencha os campos</h3>
      <div className={styles.formModal}>
        <ConfigProvider locale={ptBR}>

          <Form onFinish={onFinish} >
            <Form.Item name="cliente" label="Cliente">
              <Input
                value={busca}
                onChange={(e) => searchResponsaveis(e.target.value)}
              />
            </Form.Item>
            <Form.Item name="data" label="Selecione a data">
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>


          </Form>
        </ConfigProvider>
      </div>
      <p>{modalText}</p>
      {/* Exibir os responsáveis encontrados */}
      {responsaveisEncontrados.length > 0 ? (
        responsaveisEncontrados.map((responsavel) => (
          <div key={responsavel._id}>{responsavel.nomeCompleto}</div>
        ))
      ) : (
        <div>Nenhum responsável encontrado</div>
      )}
    </Modal>
  );
};

export default InserirHorario;