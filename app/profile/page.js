"use client"
import "./profile.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function ClientePerfil() {
    const [enabledInput, setEnabledInput] = useState(0);

    const [clienteData, setClienteData] = useState({
        usuario:'',
        password:'',
        dni: '',
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        email: '',
        direccion:'',
        telefono:'',
    });

    useEffect(() => {
        // Obtener los datos del cliente almacenados en el localStorage
        const storedClienteData = JSON.parse(localStorage.getItem('cliente'));
    
        if (storedClienteData) {
          // Si se encuentran datos en el localStorage, actualiza el estado
          setClienteData(storedClienteData);
        }
      }, []);

    const handleGoBack = () => {
        window.location.href = '/dashboard';
      }

    const handleEdit = (inputNumber) => {
        setEnabledInput(inputNumber);
      }

    const formatFecha = (fecha) => {
        if (!fecha) return '';
        const parts = fecha.split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    };

    // Función para analizar la fecha de dd/mm/aaaa a aaaa-mm-dd
    const parseFecha = (fecha) => {
        if (!fecha) return '';
        const parts = fecha.split('/');
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    };

  return (
    <>
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <img src="/imagen.jpeg" alt="Imagen" style={{ width: '120px', height: '70px' }} />
                <Navbar.Toggle aria-controls="navbarNav" />
            </Container>
        </Navbar>
        <h1 className="text">
            Mi Perfil
        </h1>
        <h2 className="subtext">
            Titular
        </h2>
        <div>
            <div className="row">
                <div className="col-md-6">
                    <Button variant="light" size="lg" onClick={() => handleEdit(1)}>
                        <FontAwesomeIcon icon={faPencil} />
                    </Button>
                    <label style={{ marginLeft: '0.5vw' }}>DNI: </label>
                    <input
                        style={{ marginTop: '0.5vw', marginBottom: '0.5vw' }}
                        type="number"
                        className="form-control"
                        value={clienteData.dni}
                        onChange={(e) => setClienteData(e.target.value)}
                        readOnly = {enabledInput != 1}
                    />

                    <div className="row">
                        <div className="col-md-6">
                            <Button variant="light" size="lg" onClick={() => handleEdit(2)}>
                                <FontAwesomeIcon icon={faPencil} />
                            </Button>
                            <label style={{ marginLeft: '0.5vw' }}>Apellido: </label>
                            <input
                                style={{ marginTop: '0.5vw', marginBottom: '0.5vw' }}
                                type="text"
                                className="form-control"
                                value={clienteData.apellido}
                                onChange={(e) => setClienteData(e.target.value)}
                                readOnly = {enabledInput != 2}
                            />
                        </div>
                        <div className="col-md-6">
                            <Button variant="light" size="lg" onClick={() => handleEdit(3)}>
                                <FontAwesomeIcon icon={faPencil} />
                            </Button>
                            <label style={{ marginLeft: '0.5vw' }}>Nombre: </label>
                            <input
                                style={{ marginTop: '0.5vw', marginBottom: '0.5vw' }}
                                type="text"
                                className="form-control"
                                value={clienteData.nombre}
                                onChange={(e) => setClienteData(e.target.value)}
                                readOnly = {enabledInput != 3}
                            />   
                        </div>
                    </div>
                    <Button variant="light" size="lg" onClick={() => handleEdit(4)}>
                        <FontAwesomeIcon icon={faPencil} />
                    </Button>
                    <label style={{ marginLeft: '0.5vw' }}>Fecha Nacimiento: </label>
                    <input
                        style={{ marginTop: '0.5vw', marginBottom: '0.5vw' }}
                        type="date"
                        className="form-control"
                        value={formatFecha(clienteData.fechaNacimiento)}
                        onChange={(e) => setClienteData(parseFecha(e.target.value))}
                        readOnly = {enabledInput != 4}
                    />
                </div>

                <div className="col-md-6">
                    <Button variant="light" size="lg" onClick={() => handleEdit(5)}>
                        <FontAwesomeIcon icon={faPencil} />
                    </Button>
                    <label style={{ marginLeft: '0.5vw' }}>Email: </label>
                    <input
                        style={{ marginTop: '0.5vw', marginBottom: '0.5vw' }}
                        type="email"
                        className="form-control"
                        value={clienteData.email}
                        onChange={(e) => setClienteData(e.target.value)}
                        readOnly = {enabledInput != 5}
                    />
                    <Button variant="light" size="lg" onClick={() => handleEdit(6)}>
                        <FontAwesomeIcon icon={faPencil} />
                    </Button>
                    <label style={{ marginLeft: '0.5vw' }}>Dirección: </label>
                    <input
                        style={{ marginTop: '0.5vw', marginBottom: '0.5vw' }}
                        type="text"
                        className="form-control"
                        value={clienteData.direccion}
                        onChange={(e) => setClienteData(e.target.value)}
                        readOnly = {enabledInput != 6}
                    />
                    <Button variant="light" size="lg" onClick={() => handleEdit(7)}>
                        <FontAwesomeIcon icon={faPencil} />
                    </Button>
                    <label style={{ marginLeft: '0.5vw' }}>Teléfono: </label>
                    <input
                        style={{ marginTop: '0.5vw', marginBottom: '0.5vw' }}
                        type="number"
                        className="form-control"
                        value={clienteData.telefono}
                        onChange={(e) => setClienteData(e.target.value)}
                        readOnly = {enabledInput != 7}
                    />
                </div>
            </div>
        </div>
        <h2 className="subtext">
            Seguridad
        </h2>
            <div className="row">
                <div className="col-md-6">
                    <Button variant="light" size="lg" onClick={() => handleEdit(2)}>
                        <FontAwesomeIcon icon={faPencil} />
                    </Button>
                    <label style={{ marginLeft: '0.5vw' }}>Usuario: </label>
                    <input
                        style={{ marginTop: '0.5vw', marginBottom: '0.5vw' }}
                        type="text"
                        className="form-control"
                        value={clienteData.usuario}
                        onChange={(e) => setClienteData(e.target.value)}
                        readOnly = {enabledInput != 8}
                    />
                </div>
                <div className="col-md-6">
                    <Button variant="light" size="lg" onClick={() => handleEdit(3)}>
                        <FontAwesomeIcon icon={faPencil} />
                    </Button>
                    <label style={{ marginLeft: '0.5vw' }}>Constraseña: </label>
                    <input
                        style={{ marginTop: '0.5vw', marginBottom: '0.5vw' }}
                        type="text"
                        className="form-control"
                        value={clienteData.password}
                        onChange={(e) => setClienteData(e.target.value)}
                        readOnly = {enabledInput != 9}
                    />   
                </div>
            </div>
        <div>
            
        </div>
        <div className="acciones d-flex justify-content-end">
            <Button variant="outline-primary" size="lg" style={{ marginRight: '0.5vw' }} onClick={handleGoBack}>Cancelar</Button>
            <Button variant="outline-success" size="lg">Guardar datos</Button>
        </div>
    </>
  );
}