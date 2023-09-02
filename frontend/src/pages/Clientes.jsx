import React, { useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import Navbar from "../components/NavBar";
import styles from './Clientes.module.css';
import { Button, Space, Modal, Form, Input } from "antd";
import axios from 'axios'
const App = () => {
  const [size, setSize] = useState("large");
  const [clientes, setClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);


  const adicionarCliente = () => {
    setModalVisible(true);
  };

  const handleModalOk = (values) => {
    // Passe os dados do cliente no corpo da requisição POST
    axios.post('http://localhost:5000/clients', values)
      .then(response => {

        setClientes([...clientes, values]); // Adicione o novo cliente à lista de clientes
        setModalVisible(false);
        showSuccessMessage();
      })
      .catch(error => {
        console.error("Erro ao criar cliente: ", error);
      });
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
      <div className="container-form m-5" >
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

      <div className={styles.container_table}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Nome</th>
              <th className={styles.tableHeader}>Contato</th>
              <th className={styles.tableHeader}>Ações</th>
            </tr>
          </thead>


          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={index}>
                <td>{cliente.nome}</td>
                <td>{cliente.contato}</td>
                <td>Ações</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


   {/* Modal para incluir os clientes */}
      <Modal
        title="Adicionar Cliente"
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={650}
        destroyOnClose
      >
        <Form onFinish={handleModalOk} layout="vertical">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: 12, width: 500 }}>
              <Form.Item
                label="Nome completo"
                name="nome"
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
            {/* Adicione mais campos de entrada conforme necessário */}
            <div style={{ marginBottom: 16 }}>
              <Form.Item
                label="Campo Adicional"
                name="campoAdicional"
                rules={[
                  { required: true, message: "Por favor, insira este campo" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            {/* Adicione mais campos de entrada conforme necessário */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Form.Item>
          </div>
        </Form>
        
      </Modal>
      {successMessageVisible && (
        <div className={styles.msgSucess}>
          Cliente criado com sucesso!
        </div>
      )}
      
    </>
  );
};

export default App;
