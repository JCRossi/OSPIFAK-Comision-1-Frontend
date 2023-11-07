"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap'
import CuponPagoPDF from "../cuponPagoPDF/page.js";
import { PDFViewer, PDFDownloadLink, Document, Page, View, Text, StyleSheet, Font } from '@react-pdf/renderer';

function CuponPago() {
  // Estado para almacenar los datos del cliente

  const [clienteData, setClienteData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    forma_pago: '',
  });

  const [periodoPago, setPeriodoPago] = useState('Noviembre 2023'); // Valor predeterminado

  const [isButtonAvailable, setIsButtonAvailable] = useState(false);

  const [loading, setLoading] = useState(true);

  const [menores, setMenores] = useState([]);

  const [planData, setPlanData] = useState({
    nombre: '',
    precio_jovenes: 0,
    precio_adultos_jovenes: 0,
    precio_adultos: 0,
    precio_adultos_mayores: 0,
  });

  useEffect(() => {
    // Obtener los datos del cliente almacenados en el localStorage
    const storedClienteData = JSON.parse(localStorage.getItem('cliente'));

    if (storedClienteData) {
      // Si se encuentran datos en el localStorage, actualiza el estado
      setClienteData(storedClienteData);
      obtenerPlan(storedClienteData.dni);
      obtenerMenores(storedClienteData.dni);
      
    }
  }, []);

  const calcularPrecioTitular = () => {
    const edad = calcularEdad(clienteData.fechaNacimiento);

    if (edad <= 21) {
      return planData.precio_jovenes;
    } else if (edad <= 35) {
      return planData.precio_adultos_jovenes;
    } else if (edad <= 55) {
      return planData.precio_adultos;
    } else {
      return planData.precio_adultos_mayores;
    }
  };

  function calcularPrecioTotal() {
    const precioTitular = calcularPrecioTitular();
    const cantidadMenores = menores ? menores.length : 0; // Cantidad de menores
  
    let factorMultiplicacion = 1; // Valor predeterminado (mensual)
  
    // Verifica la forma de pago y establece el factor de multiplicación
    if (clienteData.forma_pago === 'Semestral') {
      factorMultiplicacion = 6;
    } else if (clienteData.forma_pago === 'Anual') {
      factorMultiplicacion = 12;
    }
  
    // Calcula el precio total
    const precioJovenes = planData.precio_jovenes * cantidadMenores
    console.log(parseInt(precioTitular) + parseInt(precioJovenes));
    const precioTotal = (parseInt(precioTitular) + parseInt(precioJovenes)) * parseInt(factorMultiplicacion);
    return precioTotal;
  }
  

  const calcularEdad = (fechaNacimiento) => {
    // Función para calcular la edad
    const fechaActual = new Date();
    const fechaNac = new Date(fechaNacimiento);
    const diff = fechaActual - fechaNac;
    const edad = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    return edad;
  };

  const obtenerMenores = async (dniCliente) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/rest/menores', { dni: dniCliente });

      if (response.status === 200) {
        setMenores(response.data);
      }
    } catch (error) {
        console.error('Error al obtener los datos de los menores:', error);
    }
  };

  const obtenerPlan = async (dniCliente) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/rest/plan', { dni: dniCliente });

      if (response.status === 200) {
        console.log(response.data.nombre);
        setIsButtonAvailable(true);
        setLoading(false);
        setPlanData(response.data);
      }
    } catch (error) {
        console.error('Error al obtener los datos del plan:', error);
    }
  };


  return (
    <div className="container">
      {loading ? (
        <div className="card mx-auto" style={{ width: '200px', border: 'none' }}> {/* Establecemos el borde en "none" */}
          <div className="card-body rounded" style={{ borderRadius: '20px' }}>
            <p className="text-center">Cargando datos...</p>
          </div>
        </div>
      ) : (
      <div className="card col-8 offset-2">
        <div className="card-body rounded" style={{ borderRadius: '20px' }}>
          <div className="input-group mb-3">
            <label className="form-label text" style={{ fontSize: 'x-large', color: '#78d278' }}>Titular</label>
          </div>

          <table className="table table-striped mt-4">
            <tbody>
              <tr>
                <td>DNI: {clienteData.dni}</td>
                <td>Apellido y nombre: {clienteData.apellido} {clienteData.nombre}</td>
                <td>
                    Precio por mes: ${calcularPrecioTitular()}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="input-group mb-3">
            <label className="form-label text" style={{ fontSize: 'x-large', color: '#78d278' }}>Menores a cargo</label>
          </div>

          {menores && menores.length > 0 ? (
            <table className="table table-striped mt-4">
                <tbody>
                {menores.map((menor) => (
                    <tr key={menor.id}>
                    <td>{menor.dni}</td>
                    <td>{menor.apellido} {menor.nombre}</td>
                    <td>
                        Precio por mes: $
                        {planData.precio_jovenes}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            ) : (
            <p>No hay menores asociados a este cliente.</p>
            )}

          <div className="row">
            <div className="col-md-6">
              <form>
                <div className="input-group mb-3">
                  <span className="input-group-text" style={{ backgroundColor: 'white' }}>Forma de Pago:</span>
                  <span className="input-group-text" style={{ backgroundColor: 'white' }}>
                    {clienteData.forma_pago}
                  </span>
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="periodo_pago">Período de Pago:</label>
                    <select className="form-select" id="periodo_pago" name="periodo_pago" onChange={(e) => setPeriodoPago(e.target.value)}>
                    {clienteData.forma_pago === 'Mensual' && (
                        <>
                        <option value="Noviembre 2023">Noviembre 2023</option>
                        <option value="Diciembre 2023">Diciembre 2023</option>
                        <option value="Enero 2024">Enero 2024</option>
                        <option value="Febrero 2024">Febrero 2024</option>
                        </>
                    )}
                    {clienteData.forma_pago === 'Semestral' && (
                        <>
                        <option value="2do Semestre 2023">2do Semestre 2023</option>
                        <option value="1er Semestre 2024">1er Semestre 2024</option>
                        <option value="2do Semestre 2024">2do Semestre 2024</option>
                        </>
                    )}
                    {clienteData.forma_pago === 'Anual' && (
                        <>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        </>
                    )}
                    </select>
                </div>
    
                <PDFDownloadLink 
                document={<CuponPagoPDF cliente={clienteData} menores={menores} periodo_pago={periodoPago} plan={planData} precioCliente={calcularPrecioTitular()} precioTotal={calcularPrecioTotal()} />}
                fileName="OSPIFAK.pdf"
                style={{ display: isButtonAvailable ? 'block' : 'none' }}
                >
                <a
                    rel="noopener noreferrer"
                    style={{
                    background: '#48bb78',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    }}
                >
                    Descargar PDF
                </a>
                </PDFDownloadLink>


              </form>
            </div>

            <div className="col-md-6 col-md-offset-15">
              <div className="input-group mb-3">
                <span className="input-group-text" style={{ backgroundColor: 'white' }}>Plan:</span>
                <span className="input-group-text" style={{ backgroundColor: 'white' }}>
                  {planData.nombre}
                </span>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" style={{ backgroundColor: 'white' }}>Precio Total:</span>
                <span className="input-group-text" style={{ fontSize: 'x-large', backgroundColor: 'white' }}>
                    ${calcularPrecioTotal()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
       )}
    </div>
  );
}

export default CuponPago;
