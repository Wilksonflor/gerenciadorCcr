import React, { useState } from "react";
import jogador from "../assets/jogador.jpg";
import logo from "../assets/logo-site-real.png";
import styles from "./Login.module.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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

        <MDBCol md='4'>
            <MDBCardBody className='d-flex flex-column '>

                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
                <MDBInput wrapperClass='mb-4 ' label='Password' id='formControlLg' type='password' size="lg"/>

              <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Entrar</MDBBtn>
              <a className="small text-muted" href="#!">Esqueceu a senha?</a>
    


            </MDBCardBody>
          </MDBCol>
      </div>
    </div>
  );
};

export default Login;
