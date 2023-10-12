import React from 'react';
import Navbar from '../navbar/navbar';
import './datos.css';

function Datos() {
  const titular = {
    numeroIdentificacion: "12345",
    nombreApellido: "Nombre del Titular",
    fechaNacimiento: "01/01/1980",
    email: "titular@correo.com",
    direccion: "Calle Principal, Ciudad",
    telefono: "555-555-5555"
  };

  const integrantes = [
    { numeroIdentificacion: "54321", nombreApellido: "Integrante 1", edad: 25 },
    { numeroIdentificacion: "67890", nombreApellido: "Integrante 2", edad: 30 },
    { numeroIdentificacion: "98765", nombreApellido: "Integrante 3", edad: 18 }
  ];

  return (
    <>
      <Navbar></Navbar>
      <div className="container-datos">
        <h1>Información del Titular</h1>
        <div>
          <p className="info-label">Número de Identificación: {titular.numeroIdentificacion}</p>
          <p className="info-label">Nombre y Apellido: {titular.nombreApellido}</p>
          <p className="info-label">Fecha de Nacimiento: {titular.fechaNacimiento}</p>
          <p className="info-la bel">Email: {titular.email}</p>
          <p className="info-label">Dirección: {titular.direccion}</p>
          <p className="info-label">Teléfono: {titular.telefono}</p>
        </div>
  
        <h2>Integrantes del Plan Familiar</h2>
        <ul className='uldatos'>
          {integrantes.map(integrante => (
            <li key={integrante.numeroIdentificacion} className="integrante-item">
              ID: {integrante.numeroIdentificacion}, Nombre: {integrante.nombreApellido}, Edad: {integrante.edad}
            </li>
          ))}
        </ul>
      </div>
      </>
  );
}

export default Datos;