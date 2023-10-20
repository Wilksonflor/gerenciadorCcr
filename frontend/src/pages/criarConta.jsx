import React, { useState } from "react";
import axios from "axios";
import styles from "./criarConta.module.css";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import InputMask from 'react-input-mask'

const CriarConta = ({ isOpen, closeModal }) => {
  const navigate = useNavigate();
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [telefone, setTelefone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (values) => {
    const user = {
      nomeCompleto: values.nomeCompleto,
      telefone: values.telefone,
      username: values.username,
      password: values.password,
    };

    axios
      .post("http://localhost:5000/auth/register", user)
      .then((response) => {
        // console.log("Dados enviados com sucesso:", response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Erro ao enviar dados:", error);
      });
  };

  return (
    <div className={styles.containerFormNewUser}>
      <div className={styles.contentFormNewUser}>
        <Form
          className="form-control-lg"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            nomeCompleto: nomeCompleto,
            telefone: telefone,
            username: username,
            password: password,
          }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <div className={styles.formControl}>
            <Form.Item
              label="Nome"
              name="nomeCompleto"
              className="nomeCompleto"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira seu nome completo!",
                },
              ]}
            >
              <Input
                value={nomeCompleto}
                placeholder="Digite o seu nome completo"
                onChange={(e) => setNomeCompleto(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Contato"
              name="telefone"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira seu contato!",
                },
              ]}
            >
              <Input
                type="tel"
                placeholder="(99) 99999-9999"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Usuário"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira seu nome de usuário!",
                },
              ]}
            >
              <Input
                value={username}
                placeholder="ex: jose.junior"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira sua senha!",
                },
              ]}
            >
              <Input.Password
                value={password}
                placeholder="****************"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Criar conta
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CriarConta;
