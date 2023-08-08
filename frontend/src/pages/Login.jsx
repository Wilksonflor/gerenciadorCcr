import { useState } from "react";
import { useHistory } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import jogador from "../assets/jogador.jpg";
import logo from "../assets/logo-site-real.png";
import styles from "./Login.module.css";
import { MDBContainer, MDBCardBody, MDBCol, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";
const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const response = await axios.post("http://localhost:5000/authenticate", {
    //     usuario,
    //     password,
    //   });
    //   console.log("fez o login", response);
     
    // } catch (error) {
    //   console.log("Erro na autenticação erro:", error);
    // }
    navigate("/");
  };

  return (
    <div className={styles.container_Login}>
      <div className={styles.login_left}>
        <img src={jogador} className={styles.jogador} alt="Jogador" />
      </div>

      <div className={styles.wrapper_form}>
        <div className={styles.header_form}>
          <h1>Gerenciador de horários</h1>
          <img src={logo} className={styles.logoLogin} />
          <h2>Faça login na sua conta</h2>
        </div>
        <MDBContainer>
          <form className="form" onSubmit={handleSubmit}>
            <MDBCol md="4">
              <MDBCardBody className="d-flex flex-column">
                <label>Usuário</label>
                <MDBInput
                  wrapperClass="mb-4"
                  id="usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  type="text"
                  size="lg"
                />
                <label>Senha</label>
                <MDBInput
                  wrapperClass="mb-4 "
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  size="lg"
                />
                <button type="submit" className={styles.btn_entrar}>
                  Entrar
                </button>
                <a className="small text-muted m-2" href="#!">
                  Esqueceu a senha?
                </a>
                <p className="ms-5 m-5">
                  Não tem uma conta? <Link to="/newuser">Criar conta</Link>
                </p>
              </MDBCardBody>
            </MDBCol>
          </form>
        </MDBContainer>
      </div>
    </div>
  );
};

export default Login;
