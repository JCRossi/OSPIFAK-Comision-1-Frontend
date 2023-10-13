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
  });
  const [formErrors, setFormErrors] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    telefono: '',
  });

  const handleInputChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.id]: event.target.value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      if (formData.dni === '' || formData.nombre === '' || formData.apellido === '' || 
      formData.fecha_nacimiento === '' || formData.telefono === '') {
        toast.error('Los campos no pueden quedar vacíos');
        return;
      }
      const response = await axios.post(BASE_URL+'/registrar', formData);
      console.log(response.data);
      toast.success('Registro exitoso');

      setFormData({
        dni: '',
        nombre: '',
        apellido: '',
        fecha_nacimiento: '',
        telefono: '',
      });
    } catch (error) {
      // Comprueba si la respuesta contiene errores de validación
      if (error.response.data.errors) {
        const validationErrors = Object.values(error.response.data.errors).join(', ');
        toast.error(validationErrors);
      } else {
        // Maneja otros errores de la solicitud
        console.error(error);
        toast.error('Se produjo un error al procesar la solicitud.');
      }
    }
  };

  return (
    <>
        <Navbar></Navbar> 
            <h1>Alta Menor a Cargo</h1>
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
                            <br/>
                            <Form.Group controlId="nombre">
                                <Form.Label><h5>Nombre:</h5></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="apellido"><br/>
                            <Form.Label><h5>Apellido:</h5></Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.apellido}
                                onChange={handleInputChange}
                                required
                            />
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="fecha_nacimiento">
                            <Form.Label><h5>Fecha de Nacimiento:</h5></Form.Label>
                            <Form.Control
                                type="date"
                                value={formData.fecha_nacimiento}
                                onChange={handleInputChange}
                                required
                            />
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="telefono">
                            <Form.Label><h5>Telefono:</h5></Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                required
                            />
                            </Form.Group>
                            <br/>
                        </Col>
                    </Row>
                </Form>
            </Container>

            <Button variant="primary" type="submit">
                Cancelar
                </Button>
            <Button variant="primary" type="submit">
                Guardar Datos
                </Button>

            <ToastContainer />
    </>
  );
}