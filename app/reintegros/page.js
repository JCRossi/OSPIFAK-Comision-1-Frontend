"use client"
import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import '../prestaciones/prestaciones.css';
import axios from 'axios';

export default function Prestaciones() {
    const [prestaciones, setPrestaciones] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Obtiene el token de localStorage
      const dni = localStorage.getItem('dni');
  
      if (!dni) {
        console.error('DNI no encontrado en el Local Storage');
        return;
      }
  
      /*axios.post('http://127.0.0.1:8000/rest/reintegros'+'que es el clienteUsuario?????????', { dni })
        .then(response => {
          setPrestaciones(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error al obtener las solicitudes de prestación:', error);
          setLoading(false);
        });*/
        
    }, []);
  
    return (
      <>
        <div>
          {loading ? (
            <p>Cargando solicitudes...</p>
          ) : (
            prestaciones.length > 0 ? (
              <Table responsive borderless className="prestacionesTable">
                <thead>
                  <tr>
                    <th>DNI</th>
                    <th>Apellido y Nombre</th>
                    <th>Fecha Solicitud</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {prestaciones.map(prestacion => (
                    <tr key={prestacion.id}>
                      <td>{prestacion.cliente_menor_dni ? prestacion.cliente_menor_dni : prestacion.cliente_dni}</td>
                      <td>{prestacion.cliente_menor_dni ? prestacion.cliente_menor_apellido + " " + prestacion.cliente_menor_nombre : prestacion.cliente_apellido + " " + prestacion.cliente_nombre}</td>
                      <td>{prestacion.fecha_solicitud}</td>
                      <td>{prestacion.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No hay solicitudes de reintegros disponibles.</p>
            )
          )}
        </div>
      </>
    );
  }