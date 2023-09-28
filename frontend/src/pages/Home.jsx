import React from "react";
import NavBar from "../components/NavBar";
import Table from "../layouts/Table";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <div className={styles.main_home}>
        <NavBar />
        <h1>Todos os horários</h1>

        <div className={styles.tableContent}>
          <Table />
        </div>
      </div>
    </>
  );
};

export default Home;
