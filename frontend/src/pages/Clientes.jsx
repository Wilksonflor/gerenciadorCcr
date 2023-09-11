import React, { useState, useEffect } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import Navbar from "../components/NavBar";
import styles from "../layouts/Table.module.css";
import { Button, Space, Modal, Form, Input, message } from "antd";
import axios from "axios";
import ClientList from "../components/ClientList";
import useForm from "../useForm";
import MaskedInput from "../components/MaskedInput";

const Clientes = () => {
  const [size] = useState("large");
  const [clientes, setClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const { inputValues, handleInputChange, resetForm, form } = useForm({
    nomeCompleto: "",
    contato: "",
    observacoes: "",
  });

  const [clienteForm] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/clientes");
      setClientes(response.data.clients);
    } catch (error) {
      console.error("Erro ao obter clientes:", error);
    }
  };

  const adicionarCliente = () => {
    setModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      clienteForm.validateFields().then(async (values) => {
        const response = await axios.post("http://localhost:5000/novoCliente", values);
        console.log("Cliente criado com sucesso", response.data);

        setClientes([...clientes, response.data]);

        clienteForm.resetFields();
        setModalVisible(false);
        showSuccessMessage();
      }).catch((error) => {
        console.error("Erro ao criar cliente", error);
      });
    } catch (error) {
      console.error("Erro ao criar cliente", error);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const showSuccessMessage = () => {
    message.success("Cliente criado com sucesso!");
    setSuccessMessageVisible(true);
    setTimeout(() => {
      setSuccessMessageVisible(false);
    }, 2000);
  };

  const handleEdit = (cliente)=>{
    
  }
  
  const handleDelete = async (cliente) => { // Note que o parâmetro é 'cliente'
    try {
      await axios.delete(`http://localhost:5000/clientes/${cliente.id}`); 
      
      // Atualizar a lista de clientes após a exclusão.
      const updatedClientes = clientes.filter((c) => c.id !== cliente.id); 
      setClientes(updatedClientes);
    
      message.success("Cliente excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir cliente", error);
      message.error("Erro ao excluir cliente");
    }
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
              <th>Cliente</th>
              <th>Contato</th>
              <th>Observações</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length > 0 ? (
              clientes.map((cliente, index) => (
                <ClientList key={index} cliente={cliente} onEdit={handleEdit} onDelete={handleDelete}/>
              ))
            ) : (
              <tr key="SemClientes">
                <td colSpan="7">Não há nenhum cliente</td>
              </tr>
            )}
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
        <Form form={clienteForm} onFinish={handleModalOk} layout="vertical">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: 12, width: 500 }}>
              <Form.Item
                label="Cliente"
                name="nomeCompleto"
                value={inputValues.nomeCompleto}
                onChange={handleInputChange}
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
                value={inputValues.contato}
                onChange={handleInputChange}
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o contato do cliente",
                  },
                ]}
              >
                <MaskedInput />
              </Form.Item>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Form.Item
                label="Observações"
                name="observacoes"
                value={inputValues.observacoes}
                onChange={handleInputChange}
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
    </>
  );
};

export default Clientes;
