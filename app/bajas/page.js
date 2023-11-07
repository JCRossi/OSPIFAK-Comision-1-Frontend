import React, { useState, useEffect } from "react";
import { Modal, Row, Col } from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getTitularYMenoresACargo } from '../reintegros/reintegrosFetch';
import { solicitarBaja, getBajas } from "./bajasFetch";
import SolicitudBaja from "./solicitudBaja";

export default function Bajas() {

  const [showModal, setShowModal] = useState(false);
  const [titularYMenoresACargo, setTitularYMenoresACargo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBaja, setLoadingBaja] = useState(true);
  const [solicitudesBajaAnteriores, setSolicitudesBajaAnteriores] = useState([]);
  const [loadingSolicitudesBajaAnteriores, setLoadingSolicitudesBajaAnteriores] = useState(true);


  useEffect(() => {
    const fetchBajasAnteriores = async () => {
        try {
          setLoadingSolicitudesBajaAnteriores(true);
            const usuario = localStorage.getItem('nombre');
            const response = await getBajas(usuario);
            setSolicitudesBajaAnteriores(response);
        } catch (error) {
            console.error(error);
        } finally {
          setLoadingSolicitudesBajaAnteriores(false);
        }
    }

    fetchBajasAnteriores();
}, []);

  const handleOpenModal = async () => {
    try {
      setLoading(true);
      setShowModal(true);

      const usuario = localStorage.getItem('nombre');
      const response = await getTitularYMenoresACargo(usuario);
      setTitularYMenoresACargo(response);
    } catch (error) {
      console.log(error);
      toast.error('Error al procesar la solicitud de baja');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmation = () => {
    const selectedCliente = document.getElementById('seleccionarCliente').value;
    const selectedEntity = titularYMenoresACargo.menores.find((menor) => menor.nombre === selectedCliente);

    const confirmMessage = `¿Está seguro que desea solicitar la baja de ${
      selectedEntity ? selectedEntity.nombre : titularYMenoresACargo.cliente.nombre
    } (DNI ${
      selectedEntity ? selectedEntity.dni : titularYMenoresACargo.cliente.dni
    })?\nEsta acción no podrá revertirse.`;

    if (window.confirm(confirmMessage)) {
      handleSolicitudBaja();
    }
  };

  const handleSolicitudBaja = async () => {
    try {
      setLoadingBaja(true);
      const formData = new FormData();
      formData.append('cliente_usuario', localStorage.getItem('nombre'));
      formData.append('paciente_nombre', document.getElementById('seleccionarCliente').value);
      formData.append('comentarios', document.getElementById('comentarios').value);

      const response = await solicitarBaja(formData);
      handleCloseModal();

      window.location.href = '/dashboard';
      toast.success('Baja solicitada con éxito');
    } catch (error) {
      console.log(error);
      toast.error('Error al procesar la solicitud de baja');
    } finally {
      setLoadingBaja(false);
    }
  };

  return (
    <>
      <div className="solicitar" onClick={handleOpenModal}>
        <FontAwesomeIcon icon={faCirclePlus}/> Solicitar Baja
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered style={{ borderRadius: '15px', padding: '15px' }}>
        <Modal.Body>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <>
              <h4 className="text-center mt-3 mb-4" style={{ color: '#78d278', fontSize: '1.5rem' }}>
                Solicitud de baja
              </h4>
              <p style={{ color: '#3498db' }}>
                Tené en cuenta que si deseas solicitar la baja de todo el grupo, sólo con 
                solicitar la baja del titular es suficiente.
                En caso contrario, seleccioná únicamente al menor a cargo que desees dar de baja.
              </p>
            
              <div className="form-group mb-3">
                <label className="form-label text-muted" style={{fontSize: 'medium'}}>Seleccionar cliente *</label>
                <select className="form-select" id="seleccionarCliente" name="seleccionarCliente" defaultValue={localStorage.getItem('nombre')}>
                  <option key={titularYMenoresACargo.cliente.usuario} value={titularYMenoresACargo.cliente.nombre}>{titularYMenoresACargo.cliente.nombre}</option>
                  {titularYMenoresACargo.menores.map((menor) => (
                    <option key={menor.nombre} value={menor.nombre}>{menor.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text-muted" align="left">Comentarios</span>
                <textarea
                  id="comentarios"
                  name="comentarios"
                  className="form-control w-100" 
                  style={{
                    resize: 'none',
                    WebkitBorderRadius: '15px',
                    MozBorderRadius: '15px',
                    borderRadius: '15px',
                  }}
                  aria-label="comentarios"
                  aria-describedby="comentarios"
                  rows="3"
                  maxLength="100"
                ></textarea>
              </div>
              <div className="form-group mt-3 float-end mt-3 ">
                <button onClick={handleCloseModal} className="btn btn-outline-primary">
                  Cancelar
                </button> 
                <button
                  type="button"  
                  className="btn btn-outline-success ml-3"
                  onClick={handleConfirmation}
                > Confirmar </button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>

      <div>
        {loadingSolicitudesBajaAnteriores ? (
            <h1>Cargando solicitudes de baja..</h1>
        ) : (
            <div>
                <Row className="solicitudesBaja">
                    <Col>
                        {solicitudesBajaAnteriores && solicitudesBajaAnteriores.menoresData.length + solicitudesBajaAnteriores.titularData.length === 0 ? (
                            <p>No se encontraron solicitudes de baja.</p>
                        ) : (
                            <div className="solicitudBaja" style={{ marginBottom: "16px", padding: "16px" }}>
                                <table className="solicitudBaja-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr>
                                    <th className="text-muted" style={{ textAlign: "center", padding: "8px" }}>DNI</th>
                                    <th className="text-muted" style={{ textAlign: "center", padding: "8px" }}>Apellido y nombre</th>
                                    <th className="text-muted" style={{ textAlign: "center", padding: "8px" }}>Fecha solicitud</th>
                                    <th className="text-muted" style={{ textAlign: "center", padding: "8px" }}>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(solicitudesBajaAnteriores.titularData).map((solicitudBaja) => (
                                        <SolicitudBaja data={solicitudBaja} key={solicitudBaja.id} />
                                    ))}
                                    {Object.values(solicitudesBajaAnteriores.menoresData).map((solicitudBaja) => (
                                        <SolicitudBaja data={solicitudBaja} key={solicitudBaja.id} />
                                    ))}
                                </tbody>
                                </table>
                            </div>
                            
                        )}
                    </Col>
                </Row>
            </div>
        )}
      </div>
    </>
  );
}