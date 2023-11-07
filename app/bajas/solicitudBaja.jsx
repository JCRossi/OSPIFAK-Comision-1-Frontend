import React from "react";
import './solicitudesBaja.css'; 

const SolicitudBaja = (props) => {
  const { id, dni, apellido, nombre, created_at, estado, comentarios } = props.data;
  console.log(props.data);
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <tr>
      <td className="text-muted" style={{ textAlign: "center", padding: "8px" }}>{dni}</td>
      <td className="text-muted" style={{ textAlign: "center", padding: "8px" }}>{`${apellido} ${nombre}`}</td>
      <td className="text-muted" style={{ textAlign: "center", padding: "8px" }}>{formatDate(created_at)}</td>
      <td className="text-muted tooltip-container" style={{ textAlign: "center", padding: "8px" }}>
        {comentarios !== null && (
          <div className="tooltip-content">
            {comentarios}
          </div>
        )}
        <span>{estado}</span>
      </td>
    </tr>   
  );
};

export default SolicitudBaja;
