'use client';
import React, { useState,useEffect } from 'react';
import { Form, Row, Col, Container } from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';
import { BASE_URL } from '../constantes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../navbar';
import '../registrar/registrar.css';
import Button from 'react-bootstrap/Button';


export default function RegistrarMenor() {
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    telefono: '',
    archivo: null,
  });
  const [formErrors, setFormErrors] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    telefono: '',
    archivo: null,
  });

  const handleInputChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.id]: event.target.value,
    }));
  };

  const handleFileChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      archivo: event.target.files[0], 
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const response = await axios.post(BASE_URL + '/store', formData);

    if (formData.dni === '' || formData.nombre === '' || formData.apellido === '' || 
      formData.fecha_nacimiento === '' ||formData.telefono === ''  ) {
        toast.error('Los campos no pueden quedar vacíos');
        return;
    }
      
    setFormData({
        dni: '',
        nombre: '',
        apellido: '',
        fecha_nacimiento: '',
        telefono: '',
        archivo: null,
    });
  };

  return (
    <>
      <a className="navbar-brand" href="/dashboard">
        <img src="/imagen.jpeg" alt="Imagen" style={{ width: '120px', height: 'auto' }} />
      </a>
            <h1 className='altaCliente'>Alta Menor a Cargo</h1>
            <Container>
            <Form onSubmit={handleRegister}>
                <Row > 
                    <Col md={6}>
                            <Form.Group controlId="dni">
                                <Form.Label><h5>DNI:</h5></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.dni}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Form.Text className="text-danger">{formErrors.dni}</Form.Text>
                            </Form.Group>
                            
                            <Form.Group controlId="nombre">
                                <Form.Label><h5>Nombre:</h5></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="apellido">
                            <Form.Label><h5>Apellido:</h5></Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.apellido}
                                onChange={handleInputChange}
                                required
                            />
                            </Form.Group>
                            
                            <Form.Group controlId="fecha_nacimiento">
                            <Form.Label><h5>Fecha de Nacimiento:</h5></Form.Label>
                            <Form.Control
                                type="date"
                                value={formData.fecha_nacimiento}
                                onChange={handleInputChange}
                                required
                            />
                            </Form.Group>
                            <Form.Group controlId="telefono">
                            <Form.Label><h5>Telefono:</h5></Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                required
                            />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="archivo">
                                <Form.Label><h5>Archivo:</h5></Form.Label>
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    value={formData.archivo}
                                    onChange={handleFileChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Container className='botones'>
                <Button variant="outline-primary">Cancelar</Button>
                <Button variant="outline-success"  onClick={handleRegister}>Guardar datos</Button>
                
            </Container>
            <ToastContainer />
    </>
  );
}