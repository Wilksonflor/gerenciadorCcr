import React, { useState, useEffect } from "react";
import {
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Navbar from "../components/NavBar";
import styles from "../layouts/Table.module.css";
import { Button, Space, Modal, Form, Input, message } from "antd";
import axios from "axios";
import ClientList from "../components/ClientList";
import useForm from "../useForm";
import MaskedInput from "../components/MaskedInput";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfMake/build/vfs_fonts";

const Clientes = () => {
  // Estados
  const [size] = useState("large");
  const [clientes, setClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [clienteToPdf, setClienteToPdf] = useState([])
  const [clienteToDelete, setClienteToDelete] = useState(null);
  const [clienteEditForm] = Form.useForm();
  const [clienteForm] = Form.useForm();
  const [editedCliente, setEditedCliente] = useState(null);
  const { inputValues, handleInputChange, resetForm, form } = useForm({
    nomeCompleto: "",
    contato: "",
    observacoes: "",
  });

  // Função para buscar dados de clientes
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

  // Função para lidar com a ação de gerar relatório (a ser implementada)
  const handleRelatorio = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [];
    const details = [];
    const footer = [];

    const docDefinition = {
      content: [
        { text: "Relatório de todos os clientes", style: "header" },

        // Loop pelos clientes para criar um bloco de informações para cada um
        ...clientes.map((cliente) => [
          { text: "Nome Completo:", bold: true },
          cliente.nomeCompleto,
          { text: "Contato:", bold: true },
          cliente.contato,
          { text: "Observações:", bold: true },
          cliente.observacoes || "Nenhuma observação disponível",
          { text: "\n" },
        ]),
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 20],
          border: [false, false, false, true],
        },
      },
    };
    pdfMake.createPdf(docDefinition).download("Relatório de todos os clientes");
  };

  const handleRelatorioCliente = async ({ cliente }) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    try {
      const response = axios.get(`http://localhost:5000/agendamento/${cliente._id}`);
      const agendamento = response.data;
      console.log('response', agendamento)

      const agendamentoParaRelatorio = agendamentos.map((agendamento) => {
        return {
          text: `Cliente: ${cliente.nomeCompleto}\n data: ${agendamento.date}\n Horário inicial: ${agendamento.horaInicio}\n Horário final: ${agendamento.horaTermino}\n`,
          margin: [0, 5],
        };
      });
      const docDefinition = {
        content: [
          {
            text: `Relatório do cliente ${cliente.nomeCompleto}`,
            style: "header",
          },
          { text: "\n" },
          ...agendamentoParaRelatorio,
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: "Center",
            margin: [0, 0, 0, 10],
          },
        },
      };
      pdfMake
        .createPdf(docDefinition)
        .download(`Relatorio_${cliente.nomeCompleto}`);
    } catch (error) {
      console.log("erro ao tirar relatório do cliente", error);
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
                  onSave={handleRelatorioCliente}
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
