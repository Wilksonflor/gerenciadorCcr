import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const ClientList = ({ cliente }) => {
  return (
    <tr key={cliente.id}>
    {cliente &&(
      <>
      <td>{cliente.nomeCompleto}</td>
      <td>{cliente.contato}</td>
      <td>{cliente.observacoes}</td>
      <td>{cliente.acoes}</td>
      <td>
        <div className="d-flex gap-3">
          <span type="button" className="btn btn-info">
            <ModeEditIcon />
          </span>
          <span type="button" className="btn btn-danger">
            <DeleteForeverIcon />
          </span>
        </div>
      </td>
      </>
    )}
     {!cliente &&(
      <td colSpan="7">Não há nenhum funcionário</td>
     )}
     </tr>
  );
};

export default ClientList;
