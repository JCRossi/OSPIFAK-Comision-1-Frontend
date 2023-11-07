"use client"
import './prestacionesSolicitar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function NuevaVista() {
  const dniFromLocalStorage = localStorage.getItem('dni'); // Obtener el DNI del Local Storage
  const [selectedClienteDNI, setSelectedClienteDNI] = useState(dniFromLocalStorage || '');// Estado para almacenar el DNI del cliente seleccionado
  const [menores, setMenores] = useState([]); // Estado para almacenar los menores
  const [profesional, setProfesional] = useState(''); // Estado para el campo Profesional
  const [matricula, setMatricula] = useState(''); // Estado para el campo Matricula
  const [tipoPrestacion, setTipoPrestacion] = useState('Consultas medicas');// Estado para el campo Tipo de Prestación
  const [instituto, setInstituto] = useState(''); // Estado para el campo Instituto
  const [fechaTurno, setFechaTurno] = useState(''); // Estado para la fecha del turno
  const [comentarios, setComentarios] = useState(''); // Estado para el campo Comentarios
  const [errorMessages, setErrorMessages] = useState([]);
  const [clienteData, setClienteData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    forma_pago: '',
  });
  

  useEffect(() => {
    // Obtén el DNI del Local Storage
    const dni = localStorage.getItem('dni');
    const storedClienteData = JSON.parse(localStorage.getItem('cliente'));
    if (storedClienteData) {
      // Si se encuentran datos en el localStorage, actualiza el estado
      setClienteData(storedClienteData);
    }
  
    if (!dni) {
      console.error('DNI no encontrado en el Local Storage');
      return;
    }
  
    axios
      .post('http://127.0.0.1:8000/rest/menores', { dni })
      .then((response) => {
        setMenores(response.data);
        console.log('Respuesta de la API de menores:', response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los menores asociados:', error);
      });
  }, []);
  
  const handleFileUpload = (e) => {
    // Lógica para manejar la carga de archivos
    const files = e.target.files;
    // Puedes realizar acciones con los archivos seleccionados, como guardarlos o mostrar información sobre ellos
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener el DNI del cliente propio desde el Local Storage
    const dni = localStorage.getItem('dni');

    // Crear un objeto con los datos del formulario
    const formData = {
      dni,
      selectedClienteDNI,
      profesional,
      matricula,
      tipoPrestacion,
      instituto,
      fechaTurno,
      comentarios,
    };

    console.log(formData);

    // Realizar una solicitud POST a la API
    axios
      .post('http://127.0.0.1:8000/rest/prestaciones/solicitudes', formData)
      .then((response) => {
        // Aquí puedes manejar la respuesta de la API
        console.log('Respuesta de la API:', response.data);
        // Redirigir a una página de confirmación o realizar otras acciones
        window.location.href = '/dashboard';
      })
      .catch((error) => {
        console.error('Error al enviar los datos:', error);
        setErrorMessages(error.response.data.errors);
      });
  };

  const handleCancelarClick = () => {
    // Redirecciona al usuario a /dashboard
    window.location.href = '/dashboard';
  };

  return (
    <div>
    <h2>Solicitar Prestación</h2>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
          <label>Seleccionar Cliente</label>
          <select
            className="form-control"
            value={selectedClienteDNI} // Usar el DNI en lugar del nombre
            onChange={(e) => setSelectedClienteDNI(e.target.value)}
          >
            <option value={localStorage.getItem('dni')}>{clienteData.apellido} {clienteData.nombre}</option>
            {menores.map((menor) => (
              <option key={menor.id} value={menor.dni}>
                {menor.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Profesional</label>
            <input
              type="text"
              className= {`form-control ${errorMessages.profesional ? 'error-input' : ''}`}
              value={profesional}
              onChange={(e) => setProfesional(e.target.value)}
            />
            {errorMessages.profesional && (
              <h5 className="text-danger">{errorMessages.profesional[0]}</h5>
            )}
          </div>
          <div className="form-group col-md-6">
            <label>Matricula</label>
            <input
              type="number"
              className= {`form-control ${errorMessages.matricula ? 'error-input' : ''}`}
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />
            {errorMessages.matricula && (
              <h5 className="text-danger">{errorMessages.matricula[0]}</h5>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Tipo de Prestación</label>
          <select
            className="form-control"
            value={tipoPrestacion}
            onChange={(e) => setTipoPrestacion(e.target.value)}
          >
            <option value="Consultas medicas">Consultas medicas</option>
            <option value="Consultas medicas domiciliarias">Consultas medicas domiciliarias</option>
            <option value="Consulta medica online">Consulta medica online</option>
            <option value="Internacion">Internacion</option>
            <option value="Odontologia general">Odontologia general</option>
            <option value="Ortodoncia">Ortodoncia</option>
            <option value="Protesis odontologicas">Protesis odontologicas</option>
            <option value="Implantes odontologicos">Implantes odontologicos</option>
            <option value="Kinesiologia">Kinesiologia</option>
            <option value="Psicologia">Psicologia</option>
            <option value="Medicamentos en farmacia">Medicamentos en farmacia</option>
            <option value="Medicamentos en internacion">Medicamentos en internacion</option>
            <option value="Optica">Optica</option>
            <option value="Cirugias esteticas">Cirugias esteticas</option>
            <option value="Analisis clinicos">Analisis clinicos</option>
            <option value="Analisis de diagnostico">Analisis de diagnostico</option>

          </select>
          {errorMessages.tipoPrestacion && (
              <h5 className="text-danger">{errorMessages.tipoPrestacion[0]}</h5>
            )}
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Instituto</label>
            <input
              type="text"
              className= {`form-control ${errorMessages.instituto ? 'error-input' : ''}`}
              value={instituto}
              onChange={(e) => setInstituto(e.target.value)}
            />
            {errorMessages.instituto && (
              <h5 className="text-danger">{errorMessages.instituto[0]}</h5>
            )}
          </div>
          <div className="form-group col-md-6">
            <label>Fecha de Turno</label>
            <input
              type="date"
              className= {`form-control ${errorMessages.fechaTurno ? 'error-input' : ''}`}
              value={fechaTurno}
              onChange={(e) => setFechaTurno(e.target.value)}
            />
            {errorMessages.fechaTurno && (
              <h5 className="text-danger">{errorMessages.fechaTurno[0]}</h5>
            )}
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
          <button type="button" className="btn btn-secondary" onClick={handleCancelarClick}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
