"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Form, Button, Card, ListGroup } from 'react-bootstrap';

export default function AgregarMenores() {
  const [menores, setMenores] = useState([]);
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
  });

  const handleInputChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.id]: event.target.value,
    }));
  };

  const handleAddMenor = () => {
    setMenores((prevMenores) => [
      ...prevMenores,
      {
        dni: formData.dni,
        nombre: formData.nombre,
        apellido: formData.apellido,
      },
    ]);
    setFormData({
      dni: '',
      nombre: '',
      apellido: '',
    });
  };

  return (
    <Container>
      <div className="col-8 offset-2">
        <Card className="mt-4" style={{ borderRadius: '20px' }}>
          <Card.Body>
            <h1>Menores a Cargo</h1>
            {menores.length > 0 ? (
              <ul>
                {menores.map((menor, index) => (
                  <li key={index}>
                    {menor.nombre} {menor.apellido}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aún no tiene menores a cargo.</p>
            )}
            <Form>

            <h2>Menores Agregados</h2>
      <ListGroup>
        {menores.map((menor, index) => (
          <ListGroup.Item key={index}>
            {menor.nombre} {menor.apellido}
          </ListGroup.Item>
        ))}
      </ListGroup>

              <Form.Group className="mb-3">
                <Form.Control
                  id="dni"
                  type="text"
                  placeholder="DNI"
                  value={formData.dni}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  id="nombre"
                  type="text"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  id="apellido"
                  type="text"
                  placeholder="Apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button href="/registrarMenor" onClick={handleAddMenor}>
                Agregar Menor a Cargo
              </Button>
            </Form>
            <div className="form-group mt-4">
              <Button href="/clientes" variant="outline-success">
                Guardar Todo y Terminar
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
