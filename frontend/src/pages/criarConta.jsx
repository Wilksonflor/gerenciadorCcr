import React, { useState } from "react";
import axios from "axios";
import styles from "./criarConta.module.css";
import { useNavigate } from "react-router-dom";
const CriarConta = ({ isOpen, closeModal }) => {
  const navigate = useNavigate();
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [telefone, setTelefone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      nomeCompleto,
      telefone,
      username,
      password,

    };

    axios
  .post("http://localhost:5000/auth/register", user) 
  .then((response) => {
    console.log("Dados enviados com sucesso:", response.data);
    navigate('/');
  })
  .catch((error) => {
    console.error("Erro ao enviar dados:", error);
  });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="nome"
              placeholder="Nome"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
            />
            <label htmlFor="nomeCompleto">Nome completo</label>
          </div>

          <div className="form-floating">
            <input
              type="tel"
              className="form-control"
              id="telefone"
              placeholder="Contato"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
            <label htmlFor="telefone">Contato</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="usuario"
              placeholder="*****"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="usuario">Usuário</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="senha"
              placeholder="*****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="senha">Senha</label>
          </div>

    

          <button type="submit">Criar conta</button>
        </form>
      </div>
    </div>
  );
};

export default CriarConta;