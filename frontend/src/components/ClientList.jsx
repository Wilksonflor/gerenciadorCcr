import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const ClientList = ({ cliente, onEdit, onDelete }) => {
  return (
    <tr >
        <>
          <td>{cliente.nomeCompleto}</td>
          <td>{cliente.contato}</td>
          <td>{cliente.observacoes}</td>
          <td>
            <div className="d-flex justify-content-center gap-4 ">
              <span
                type="button"
                className="btn btn-info"
                onClick={() => onEdit(cliente)}
              >
                <ModeEditIcon />
              </span>
              <span
                type="button"
                className="btn btn-danger"
                onClick={() => onDelete(cliente)}
              >
                <DeleteForeverIcon />
              </span>
            </div>
          </td>
        </>
    </tr>
  );
};

export default ClientList;
