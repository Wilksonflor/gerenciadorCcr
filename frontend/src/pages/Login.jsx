import React from "react";
import { useState, useEffect } from "react";
import jogador from "../assets/jogador.jpg";
import styles from "./Login.module.css";
const Login = () => {
  return (
    <div className={styles.container_Login}>
      <div className={styles.login_left}>
        <img src={jogador} className={styles.jogador}/>
      </div>

      <div className={styles.login_right}>
        <h1>Gerenciador de horários</h1>
        <form></form>
      </div>
    </div>
  );
};

export default Login;
