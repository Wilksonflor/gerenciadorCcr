import React, { useState, useEffect } from "react";
import {
  UserAddOutlined} from "@ant-design/icons";
import Navbar from "../components/NavBar";
import styles from "../layouts/Table.module.css";
import { Button, Space, Modal, Form, Input, message } from "antd";
import axios from "axios";
import ClientList from "../components/ClientList";
import useForm from "../useForm";
import MaskedInput from "../components/MaskedInput";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";



const Clientes = () => {
  const [size] = useState("large");
  const [clientes, setClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);
  const [clienteEditForm] = Form.useForm();
  const [clienteForm] = Form.useForm();
  const [editedCliente, setEditedCliente] = useState(null);
  const { inputValues, handleInputChange, resetForm, form } = useForm({
    nomeCompleto: "",
    contato: "",
    observacoes: "",
  });

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

  // Função para abrir o modal "Adicionar Cliente"
  const adicionarCliente = () => {
    setModalVisible(true);
  };

  // Função para lidar com o envio do formulário de adição de cliente
  const handleModalOk = async () => {
    try {
      clienteForm
        .validateFields()
        .then(async (values) => {
          const response = await axios.post(
            "http://localhost:5000/novoCliente",
            values
          );
          console.log("Cliente criado com sucesso", response.data);

          setClientes([...clientes, response.data]);

          clienteForm.resetFields();
          setModalVisible(false);
          showSuccessMessage();
        })
        .catch((error) => {
          console.error("Erro ao criar cliente", error);
        });
    } catch (error) {
      console.error("Erro ao criar cliente", error);
    }
  };

  // Função para fechar o modal "Adicionar Cliente"
  const handleModalCancel = () => {
    setModalVisible(false);
  };

  // Função para exibir a mensagem de sucesso
  const showSuccessMessage = () => {
    message.success("Cliente criado com sucesso!");
    setSuccessMessageVisible(true);
    setTimeout(() => {
      setSuccessMessageVisible(false);
    }, 2000);
  };

  // Função para abrir o modal "Editar Cliente"
  const handleEdit = (cliente) => {
    setEditedCliente(cliente);
    setEditModalVisible(true);

    clienteEditForm.setFieldsValue({
      nomeCompleto: cliente.nomeCompleto,
      contato: cliente.contato,
      observacoes: cliente.observacoes,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/clientes/${editedCliente._id}`,
        {
          nomeCompleto: clienteEditForm.getFieldValue("nomeCompleto"),
          contato: clienteEditForm.getFieldValue("contato"),
          observacoes: clienteEditForm.getFieldValue("observacoes"),
        }
      );
      console.log("Cliente editado com sucesso", editedCliente);

      if (response.status === 200) {
        message.success("Cliente atualizado");
        setEditModalVisible(false);
      }
    } catch (error) {
      console.error("Erro ao editar cliente", error);
    }
  };

  // Função para cancelar a exclusão
  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  // Função para abrir o modal de confirmação de exclusão
  const handleDelete = (cliente) => {
    setClienteToDelete(cliente);
    setDeleteModalVisible(true);
  };

  // Função para confirmar a exclusão do cliente
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/clientes/${clienteToDelete._id}`
      );

      const updatedClientes = clientes.filter(
        (c) => c._id !== clienteToDelete._id
      );
      setClientes(updatedClientes);

      message.success("Cliente excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir cliente", error);
      message.error("Erro ao excluir cliente");
    } finally {
      setDeleteModalVisible(false);
    }
  };

  // Função para gerar um relatório com todos os clientes
  const handleRelatorio = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    // Definição e conteúdo do PDF
    const docDefinition = {
     
      content: [
        { text: "Relatório de todos os clientes", style: "header" },
        {
          style: "tableExample",
          table: {
            alignment: 'center',
            headerRows: 1,
            widths: [180, 120, 150],
            body: [
              [
                { text: "Cliente", style: "tableHeader" },
                { text: "Contato", style: "tableHeader" },
                { text: "Observações", style: "tableHeader" },
              ],
              ...clientes.map((cliente) => [
                { text: cliente.nomeCompleto },
                { text: cliente.contato },
                { text: cliente.observacoes || "" },
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 20],

        },
        tableExample: {
          margin: [0, 20, 0, 8],
        },
        tableHeader: {
          
          bold: true,
          fontSize: 13,
          color: "black",
        },
      },
    };
    pdfMake.createPdf(docDefinition).download("Relatório de todos os clientes");
  };

  // Função para tirar relatório de apenas um cliente
  const handleRelatorioCliente = async (clienteId) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  
    try {
      const response = await axios.get(
        `http://localhost:5000/clientes/relatorio/${clienteId}`
      );
  
      const { clienteComAgendamento } = response.data;
      const { client, agendamentos } = clienteComAgendamento;
  
      if (!client) {
        console.log("cliente não encontrado");
        return;
      }
  
      // Calcular a soma dos valores
      const somaValores = agendamentos.reduce((total, agendamento) => {
        return total + (agendamento.valor || 0);
      }, 0);
  
      const docDefinition = {
        content: [
          {
            alignment: 'center',
            text: `Relatório de agendamentos de ${client.nomeCompleto}`,
            style: "header",
            width: [100, 100, 100],
          },
          {
            margin: [0, 0, 0, 20],
            style: "tableExample",
            table: {
              headerRows: 1,
              widths: [150, 100, 100, 80],
              body: [
                [
                  { text: "Data de Agendamento", style: "tableHeader" },
                  { text: "Hora de Início", style: "tableHeader" },
                  { text: "Hora de Término", style: "tableHeader" },
                  { text: "Valor", style: "tableHeader" },
                ],
                ...agendamentos.map((agendamento) => [
                  agendamento.date,
                  agendamento.horaInicio,
                  agendamento.horaTermino,
                  {
                    text: `R$ ${agendamento.valor ? agendamento.valor.toLocaleString("pt-BR") : ""},00`,
                    style: "currency",
                    currency: "BRL",
                  }
                ]),
                [
                  { text: "Total", style: "tableHeader" },
                  "", // Célula vazia para as colunas Data e Hora
                  "",
                  {
                    text: `R$ ${somaValores.toFixed(2)}`, // Formatando a soma com 2 casas decimais
                    style: "currency",
                    currency: "BRL",
                    bold: true,
                  }
                ],
              ],
            },
          },
        ],
        styles: {
          header: {
            fontSize: 16,
            bold: true,
            alignment: "center",
            margin: [5, 15, 0, 20],
          },
          tableExample: {
            margin: [0, 20, 0, 8],
            alignment: 'center'
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: "black",
          },
        },
      };
  
      pdfMake
        .createPdf(docDefinition)
        .download(`Relatório de Agendamentos de ${client.nomeCompleto}.pdf`);
    } catch (error) {
      console.log("Erro ao gerar o relatório do cliente", error);
    }
  };

 


  return (
    <>
      <Navbar />
      {/* Botão para adicionar cliente */}
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
        <Space wrap>
          <Button
            type="button"
            className="btn btn-danger m-lg-1"
            icon={<DescriptionIcon />}
            size={size}
            onClick={handleRelatorio}
          >
            Lista de clientes
          </Button>
        </Space>
      </div>

      {/* Tabela de clientes */}
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
                <ClientList
                  key={index}
                  cliente={cliente}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onSave={() => {
                    handleRelatorioCliente(cliente._id);
                  }}
                />
              ))
            ) : (
              <tr key="SemClientes">
                <td colSpan="7">Não há nenhum cliente</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal "Adicionar Cliente" */}
      <Modal
        title="Adicionar Cliente"
        open={modalVisible}
        onOk={handleModalOk}
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

      {/* Modal "Editar Cliente" */}
      <Modal
        title="Editar Cliente"
        open={editModalVisible}
        onOk={handleSaveEdit}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        width={650}
        destroyOnClose
      >
        <Form
          form={clienteEditForm}
          onFinish={handleSaveEdit}
          layout="vertical"
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: 12, width: 500 }}>
              <Form.Item
                label="Cliente"
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
                <MaskedInput />
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

      {/* Modal de confirmação de exclusão */}
      <Modal
        title="Confirmar Exclusão"
        open={deleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Sim"
        cancelText="Não"
      >
        Tem certeza que deseja excluir este cliente?
      </Modal>
    </>
  );
};

export default Clientes;
