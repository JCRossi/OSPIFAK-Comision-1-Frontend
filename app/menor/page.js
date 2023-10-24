"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';


export default function AgregarMenores() {
  const [menores, setMenores] = useState([]);
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
  });

  // Obtener los datos del menor de los parámetros de la URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dni = params.get('dni');
    const nombre = params.get('nombre');
    const apellido = params.get('apellido');

    if (dni && nombre && apellido) {
      setFormData({
        dni: dni,
        nombre: nombre,
        apellido: apellido,
      });
    }
  }, []);


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
  function redireccionarARegistrarMenor() {
    window.location.href = '/registrarMenor';
  }
  return (
     <Container>
      <h1>Agregar Menores a Cargo</h1>
      <Form>
        {/* ... (otros campos de entrada) */}

        <Button variant="primary" onClick={handleAddMenor}>
          Mostar menor a cargo
        </Button>
      </Form>

      <hr />

      <h2>Menores Agregados</h2>
      <ListGroup>
        {menores.map((menor, index) => (
          <ListGroup.Item key={index}>
            {menor.nombre} {menor.apellido}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Link href="/registrarMenor">Registrar Menor</Link>
   
    </Container>
  );
}
