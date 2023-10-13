'use client';
import React, { useState,useEffect } from 'react';
import { Form, Row, Col, Container } from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';
import { BASE_URL } from '../constantes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../navbar';
import './registrar.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Registrar() {
  const [planes, setPlanes] = useState([]);
  const [formData, setFormData] = useState({
    usuario: '',
    password: '',
    dni: '',
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    email: '',
    direccion: '',
    telefono: '',
    plan_id: '',
    forma_pago: '',
  });


  useEffect(() => {
    axios.get(BASE_URL + '/planes')
      .then((response) => {
        setPlanes(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los planes:', error);
      });
  }, []);
  
  const handleInputChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.id]: event.target.value,
    }));
  };



  const handleRegister = async (event) => {
    event.preventDefault();
  
    try {
      // Realiza la solicitud POST a Laravel
      const response = await axios.post(BASE_URL + '/registrar', formData);
  
      // Comprueba si la respuesta contiene un mensaje de éxito
      if (response.data.message) {
        toast.success(response.data.message);
        setFormData({
          usuario: '',
          password: '',
          dni: '',
          nombre: '',
          apellido: '',
          fecha_nacimiento: '',
          email: '',
          direccion: '',
          telefono: '',
          plan_id: '',
          forma_pago: '',
        });
      }
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
    <br/>
    <h1>Alta Cliente</h1>
    <br/>
    <h3>Titular</h3>
          <Container>
            <Form onSubmit={handleRegister}>
                <Row > 
                    <Col md={6} className="left-column">
                            <Form.Group controlId="usuario"><br/>
                                <Form.Label><h5>Usuario:</h5></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.usuario}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="password"><br/>
                                <Form.Label><h5>Contraseña:</h5></Form.Label>
                                <Form.Control
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="dni">
                                <Form.Label><h5>DNI:</h5></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.dni}
                                    onChange={handleInputChange}
                                    required
                                />
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
                            <Form.Group controlId="email"><br/>
                            <Form.Label><h5>Correo electrónico:</h5></Form.Label>
                            <Form.Control
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="direccion">
                            <Form.Label><h5>Direccion:</h5></Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.direccion}
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
                        <Col md={6} className="right-column">
                            <Form.Group controlId="plan_id">
                              <Form.Label><h5>Plan:</h5></Form.Label>
                              <Form.Select
                                aria-label="Default select example"
                                value={formData.plan_id}
                                onChange={handleInputChange}
                              >
                                <option value=""></option>
                                {planes.map((plan) => (
                                  <option key={plan.id} value={plan.id}>
                                    {plan.nombre}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>

                            <br/>
                            <Form.Group controlId="forma_pago">
                              <Form.Label><h5>Forma de Pago:</h5></Form.Label>
                              <Form.Select
                                aria-label="Default select example"
                                value={formData.forma_pago}
                                onChange={(event) => {
                                  setFormData({ ...formData, forma_pago: event.target.value });
                                }}
                              >
                                <option></option>
                                <option value="Mensual">Mensual</option>
                                <option value="Semestral">Semestral</option>
                                <option value="Anual">Anual</option>
                              </Form.Select>
                            </Form.Group>

                            <br/>
                           
                         </Col>
                    </Row>
                </Form>
            </Container>
            

            <h3>A Cargo</h3>                     


            
            <Button variant="outline-success">
              <Link href="/registrarMenor" className="bottom-bar-links">Menor a cargo</Link>
            </Button>

          
            <Button variant="primary" onClick={handleRegister}>
                Guardar Datos
            </Button>
            <ToastContainer />
           
    
    </>
  );
}