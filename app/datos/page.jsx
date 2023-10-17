"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import './datos.css';
import { API } from '../config.js'

function Datos() {
  const [titular, setTitular] = useState(null);
  const [integrantes, setIntegrantes] = useState([]);

  useEffect(() => {
    fetch(API+'/datos') 
      .then((response) => response.json())
      .then((data) => {
        setTitular({
          numeroIdentificacion: data.dni,
          nombreApellido: `${data.nombre} ${data.apellido}`,
          fechaNacimiento: data.fecha_nacimiento,
          email: data.email,
          direccion: data.direccion,
          telefono: data.telefono,
        });

        setIntegrantes(
          data.clientes_menores.map((integrante) => ({
            numeroIdentificacion: integrante.dni,
            nombreApellido: `${integrante.nombre} ${integrante.apellido}`,
            edad: new Date().getFullYear() - new Date(integrante.fecha_nacimiento).getFullYear(),
          }))
        );
      });
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="container-datos">
        <h1>Información del Titular</h1>
        <div>
          <p className="info-label">Número de Identificación: {titular ? titular.numeroIdentificacion : 'Cargando...'}</p>
          <p className="info-label">Nombre y Apellido: {titular ? titular.nombreApellido : 'Cargando...'}</p>
          <p className="info-label">Fecha de Nacimiento: {titular ? titular.fechaNacimiento : 'Cargando...'}</p>
          <p className="info-label">Email: {titular ? titular.email : 'Cargando...'}</p>
          <p className="info-label">Dirección: {titular ? titular.direccion : 'Cargando...'}</p>
          <p className="info-label">Teléfono: {titular ? titular.telefono : 'Cargando...'}</p>
        </div>

        <h2>Integrantes del Plan Familiar</h2>
        <ul className="uldatos">
          {integrantes.map((integrante) => (
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
