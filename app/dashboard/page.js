"use client"
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar';
import Tramites from '../tramites/page.js';
import Datos from '../datos/page';

const linkStyle = {
  textDecoration: 'none',
  color: '#333', // Color de texto
  fontSize: '1.2rem', // Tamaño de fuente
  margin: '0 10px', // Márgenes
  cursor: 'pointer', // Cambiar el cursor al pasar el mouse
  fontWeight: 'bold', // Establecer el texto en negrita
};

const hrStyle = {
  border: 'none',
  borderBottom: '3px solid transparent', // Línea transparente inicial
};

export default function Dashboard() {
  const [radioValueDashboard, setRadioValueDashboard] = useState('1');

  return (
    <>
      <Navbar></Navbar>

      <div className="cont text-center">
        <div style={{ marginTop: '3vh' }}>
          <span
            style={{ ...linkStyle, borderBottom: radioValueDashboard === '1' ? '3px solid green' : 'none' }}
            onClick={() => setRadioValueDashboard('1')}
            className={radioValueDashboard === '1' ? 'text-success' : 'text-secondary'}
          >
            Mis datos
          </span>
          <span
            style={{ ...linkStyle, borderBottom: radioValueDashboard === '2' ? '3px solid green' : 'none' }}
            onClick={() => setRadioValueDashboard('2')}
            className={radioValueDashboard === '2' ? 'text-success' : 'text-secondary'}
          >
            Mis trámites
          </span>
        </div>
        {radioValueDashboard === '1' && <Datos />}
        {radioValueDashboard === '2' && <Tramites />}
      </div>
    </>
  );
}
