"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './datos.css';
import { API } from '../config.js';

export default function Datos() {
  const [titular, setTitular] = useState(null);
  const [integrantes, setIntegrantes] = useState([]);

  useEffect(() => {
    const usuario = localStorage.getItem('nombre');

    axios.get(API + '/datos', {
      params: { usuario: usuario }
    })
      .then((response) => {
        const data = response.data;

        console.log(data);
        
        setTitular({
          numeroIdentificacion: data.DNI,
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
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  return (
    <>
      <div className="container-datos-general" style={{ marginTop: '2vh' }}>
        <div className='container-datos'>
          <div className='titular'>
            <h2>Información del Titular</h2>
            {titular ? (
              <>
                <p className="info-label">Número de Identificación: {titular.numeroIdentificacion}</p>
                <p className="info-label">Nombre y Apellido: {titular.nombreApellido}</p>
                <p className="info-label">Fecha de Nacimiento: {titular.fechaNacimiento}</p>
                <p className="info-label">Email: {titular.email}</p>
                <p className="info-label">Dirección: {titular.direccion}</p>
                <p className="info-label">Teléfono: {titular.telefono}</p>
              </>
            ) : (
              <p>Cargando datos del titular...</p>
            )}
          </div>
          <div className='integrantes'>
            <h2>Integrantes del Plan Familiar</h2>
            {integrantes.length > 0 ? (
              <ul className='uldatos'>
                {integrantes.map(integrante => (
                  <li key={integrante.numeroIdentificacion} className="integrante-item">
                    ID: {integrante.numeroIdentificacion}, Nombre: {integrante.nombreApellido}, Edad: {integrante.edad}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Cargando datos de los integrantes...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
