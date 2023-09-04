import React, { useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import Navbar from "../components/NavBar";
import styles from "../layouts/Table.module.css";
import { Button, Space, Modal, Form, Input } from "antd";
import axios from "axios";

const Clientes = () => {
  const [size, setSize] = useState("large");
  const [clientes, setClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [form] = Form.useForm(); // Adicionei esta linha para criar o objeto de formulário

  const adicionarCliente = () => {
    setModalVisible(true);
  };

  const handleModalOk = async (values) => {
    try {
      console.log("Botão 'Salvar' clicado");
      console.log("Valores do formulário:", values); 
      const response = await axios.post(
        "http://localhost:5000/clientes",
        values
      );
      console.log("Cliente criado com sucesso", response.data);
      setClientes([...clientes, response.data]);
      setModalVisible(false);
      showSuccessMessage();
    } catch (error) {
      console.error("Erro ao criar cliente", error);
    }
  };
  
  

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const showSuccessMessage = () => {
    setSuccessMessageVisible(true);
    setTimeout(() => {
      setSuccessMessageVisible(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="container-form m-5">
        <Space wrap>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            size={size}
            onClick={adicionarCliente}
          >
            Adicionar cliente
          </Button>
        </Space>
      </div>

      <div className="container-lg">
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome completo</th>
              <th>Contato</th>
              <th>Observações</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={index}>
                <td>{cliente.nome}</td>
                <td>{cliente.contato}</td>
                <td>{cliente.observacoes}</td>
                <td>Ações</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        title="Adicionar Cliente"
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={650}
        destroyOnClose
      >
        <Form form={form} onFinish={handleModalOk} layout="vertical">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: 12, width: 500 }}>
              <Form.Item
                label="Nome completo"
                name="nomeCompleto"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o nome do cliente",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ marginBottom: 16 }}>
              <Form.Item
                label="Telefone para contato"
                name="contato"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o contato do cliente",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ marginBottom: 16 }}>
              <Form.Item
                label="Observações"
                name="observacoes"
                rules={[
                  { required: false, message: "Por favor, insira este campo" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>

      {successMessageVisible && (
        <div className={styles.msgSucess}>Cliente criado com sucesso!</div>
      )}
    </>
  );
};

export default Clientes;
