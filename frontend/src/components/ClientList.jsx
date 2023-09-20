import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
const ClientList = ({ cliente, onEdit, onDelete, onSave }) => {

  
  return (
    <tr >
        <>
          <td>{cliente.nomeCompleto}</td>
          <td>{cliente.contato}</td>
          <td>{cliente.observacoes}</td>
          <td>
            <div className="d-flex justify-content-center gap-2 ">
              <span
                type="button"
                className="btn btn-info btn-sm"
                onClick={() => onEdit(cliente)}
              >
                <ModeEditIcon />
              </span>
              <span
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(cliente)}
              >
                <DeleteForeverIcon />
              </span>
              <span
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => onSave(cliente)}
              >
                <PictureAsPdfIcon />
              </span>
            </div>
          </td>
        </>
    </tr>
  );
};

export default ClientList;
