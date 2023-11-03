"use client"
import  "./globals.css";
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function NavbarPagina() {
  const [clienteData, setClienteData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    forma_pago: '',
  });

  useEffect(() => {
    // Obtener los datos del cliente almacenados en el localStorage
    const storedClienteData = JSON.parse(localStorage.getItem('cliente'));

    if (storedClienteData) {
      // Si se encuentran datos en el localStorage, actualiza el estado
      setClienteData(storedClienteData);
    }
  }, []);

  const handleClientProfile = () => {
    window.location.href = '/profile';
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <img src="/imagen.jpeg" alt="Imagen" style={{ width: '120px', height: '70px' }} />
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto">
              <Nav.Item>
                  <h2>
                    <Badge bg="light" text="dark">
                      Cliente {clienteData.nombre}
                    </Badge>
                  </h2>
              </Nav.Item>
              <Nav.Item>
                <Button variant="light" size="lg" onClick={handleClientProfile}>
                  <FontAwesomeIcon icon={faUser} />
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}