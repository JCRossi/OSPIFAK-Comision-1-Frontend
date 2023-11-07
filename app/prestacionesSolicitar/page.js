"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';

export default function NuevaVista() {
  const [selectedCliente, setSelectedCliente] = useState(''); // Estado para el cliente seleccionado
  const [profesional, setProfesional] = useState(''); // Estado para el campo Profesional
  const [matricula, setMatricula] = useState(''); // Estado para el campo Matricula
  const [tipoPrestacion, setTipoPrestacion] = useState(''); // Estado para el campo Tipo de Prestación
  const [instituto, setInstituto] = useState(''); // Estado para el campo Instituto
  const [fechaTurno, setFechaTurno] = useState(''); // Estado para la fecha del turno
  const [comentarios, setComentarios] = useState(''); // Estado para el campo Comentarios

  const handleFileUpload = (e) => {
    // Lógica para manejar la carga de archivos
    const files = e.target.files;
    // Puedes realizar acciones con los archivos seleccionados, como guardarlos o mostrar información sobre ellos
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario (por ejemplo, una solicitud al servidor)
  };

  return (
    <div>
      <h2>Solicitar Prestación</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Seleccionar Cliente</label>
          <select
            className="form-control"
            value={selectedCliente}
            onChange={(e) => setSelectedCliente(e.target.value)}
          >
            {/* Opciones para seleccionar un cliente */}
            <option value="cliente1">Cliente 1</option>
            <option value="cliente2">Cliente 2</option>
            {/* Agrega más opciones según tus clientes */}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Profesional</label>
            <input
              type="text"
              className="form-control"
              value={profesional}
              onChange={(e) => setProfesional(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Matricula</label>
            <input
              type="number"
              className="form-control"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Tipo de Prestación</label>
          <select
            className="form-control"
            value={tipoPrestacion}
            onChange={(e) => setTipoPrestacion(e.target.value)}
          >
            {/* Opciones para el tipo de prestación */}
            <option value="prestacion1">Prestación 1</option>
            <option value="prestacion2">Prestación 2</option>
            {/* Agrega más opciones según tus tipos de prestación */}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Instituto</label>
            <input
              type="text"
              className="form-control"
              value={instituto}
              onChange={(e) => setInstituto(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Fecha de Turno</label>
            <input
              type="date"
              className="form-control"
              value={fechaTurno}
              onChange={(e) => setFechaTurno(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Comentarios</label>
          <textarea
            className="form-control"
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Adjuntar Archivos</label>
          <input
            type="file"
            className="form-control-file"
            multiple
            onChange={handleFileUpload}
          />
        </div>

        <div className="text-right">
          <button type="submit" className="btn btn-primary mr-2">
            Confirmar
          </button>
          <button type="button" className="btn btn-secondary">
          <i className="fa fa-arrow-left text-white"></i> Volver
          </button>
        </div>
      </form>
    </div>
  );
}
