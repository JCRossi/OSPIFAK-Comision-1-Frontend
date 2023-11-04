"use client";

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTitularYMenoresACargo, postReintegro } from '../reintegros/reintegrosFetch';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../navbar';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const SolicitarReintegro = () => {
  const router = useRouter();

  const [files, setFiles] = useState([]);

  const [profesional, setProfesional] = useState('');
  const [instituto, setInstituto] = useState('');
  const [cbu, setCbu] = useState('');
  const [matricula, setMatricula] = useState('');
  const [fechaPago, setFechaPago] = useState('');
  const [fileAttached, setFileAttached] = useState(false);

  const [profesionalError, setProfesionalError] = useState(null);
  const [institutoError, setInstitutoError] = useState(null);
  const [cbuError, setCbuError] = useState(null);
  const [matriculaError, setMatriculaError] = useState(null);
  const [fechaPagoError, setFechaPagoError] = useState(null);
  const [fileError, setFileError] = useState(null);

  const [titularYMenoresACargo, setTitularYMenoresACargo] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      const fetchTitularYMenoresACargo = async () => {
          try {
              setLoading(true);
              const usuario = localStorage.getItem('nombre');
              const response = await getTitularYMenoresACargo(usuario);
              setTitularYMenoresACargo(response);
          } catch (error) {
              console.error(error);
          } finally {
              setLoading(false);
          }
      }

      fetchTitularYMenoresACargo();
  }, []);

  function formDataToObject(formData) {
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    return object;
}

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!profesional || !instituto || !cbu || !matricula || !fechaPago || !fileAttached) {
      setProfesionalError(!profesional ? 'El campo no puede dejarse sin completar.' : null);
      setInstitutoError(!instituto ? 'El campo no puede dejarse sin completar.' : null);
      setCbuError(!cbu ? 'El campo no puede dejarse sin completar.' : null);
      setMatriculaError(!matricula ? 'El campo no puede dejarse sin completar.' : null);
      setFechaPagoError(!fechaPago ? 'El campo no puede dejarse sin completar.' : null);
      setFileError(!fileAttached ? 'Debe adjuntar al menos un pdf.' : null);
      return;
    }

    const formData = new FormData();
    formData.append('cliente_usuario', document.getElementById('seleccionarCliente').value);
    formData.append('medico_nombre', document.getElementsByName('profesional')[0].value);
    formData.append('nombre_instituto', document.getElementsByName('instituto')[0].value);
    formData.append('cbu', document.getElementsByName('cbu')[0].value);
    formData.append('matricula', document.getElementsByName('matricula')[0].value);
    formData.append('fecha_estudio_compra', document.getElementsByName('fecha_pago')[0].value);
    formData.append('tipo_reintegro', document.getElementById('tipo_reintegro').value);
    formData.append('comentarios', document.getElementById('comentarios').value);
    
    files.forEach((file, index) => {
      if (index === 0) {
        formData.append('factura', file);
      } else if (index === 1) {
        formData.append('orden_medica', file);
      }
    });

    try {
      console.log(formDataToObject(formData));
      const response = await postReintegro(formData);
      toast.success('Reintegro solicitado con éxito');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error al solicitar reintegro:', error);
    }
  };


  const displayFileInfo = () => {
    const fileInput = document.getElementById('fileInput');
    const fileInfo = document.getElementById('fileInfo');
    const fileNameSpan = document.getElementById('fileName');

    const newFiles = Array.from(fileInput.files);
    const updatedFiles = [...files, ...newFiles];

    if (newFiles.length > 0) {
      const fileNames = updatedFiles.map(file => file.name).join(', ');
      fileNameSpan.textContent = fileNames;
      fileInfo.style.display = 'inline-flex';
      setFileAttached(true);
      setFileError(null);
  
      setFiles(updatedFiles);
    } else {
      fileInfo.style.display = 'none';
      setFileAttached(false);
    }
  };
  
  return (
    <>
      <Navbar></Navbar>
      <div className="container mt-4 ">
        <div className="card col-8 offset-2" style={{ borderRadius: '35px' }}>
          {loading ? (
            <h1>Cargando...</h1>
          ) : (
            <div className="card-body rounded" style={{ borderRadius: '15px' }}>
              <div className="form-group mb-3 text-center">
                <label className="form-label text-center mt-3 mb-4" style={{ fontSize: 'x-large', color: '#78d278' }}>
                  Solicitar Reintegro
                </label>
              </div>

              
                <div className="row">
                  <div className="col-md-7">
                  <div className="form-group mb-3">
                      <label className="form-label text-muted" style={{fontSize: 'medium'}}>Seleccionar cliente *</label>
                      <select className="form-select" id="seleccionarCliente" name="seleccionarCliente" defaultValue={localStorage.getItem('nombre')}>
                        <option key={titularYMenoresACargo.cliente.usuario} value={titularYMenoresACargo.cliente.usuario}>{titularYMenoresACargo.cliente.nombre}</option>
                        {titularYMenoresACargo.menores.map((menor) => (
                          <option key={menor.nombre} value={menor.nombre}>{menor.nombre}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group mb-3">
                      <label className="form-label text-muted" style={{fontSize: 'medium'}}>Profesional *</label>
                      <input
                        type="text"
                        name="profesional"
                        className={`form-control bg-white ${profesionalError ? 'is-invalid' : ''}`}
                        onChange={(e) => {
                          setProfesional(e.target.value);
                          setProfesionalError(null);
                        }}
                      />
                      {profesionalError && <div className="invalid-feedback">{profesionalError}</div>}
                    </div>

                    <div className="form-group mb-3">
                      <label className="form-label text-muted" style={{fontSize: 'medium'}}>Instituto *</label>
                      <input
                        type="text"
                        name="instituto"
                        className={`form-control bg-white ${institutoError ? 'is-invalid' : ''}`}
                        onChange={(e) => {
                          setInstituto(e.target.value);
                          setInstitutoError(null);
                        }}
                      />
                      {institutoError && <div className="invalid-feedback">{institutoError}</div>}
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
                  </div>

                  <div className="col-md-5 col-md-offset-15">
                    <div className="form-group mb-3">
                      <label className="form-label text-muted" style={{fontSize: 'medium'}}>Tipo reintegro *</label>
                      <select 
                        className="form-select" 
                        id="tipo_reintegro" 
                        name="tipo_reintegro" 
                        defaultValue="estudio"
                      >
                        <option value="estudio">Estudio</option>
                        <option value="insumo" >Insumo</option>
                      </select>
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label text-muted" style={{fontSize: 'medium'}}>CBU *</label>
                        <input
                          type="text"
                          name="cbu"
                          className={`form-control bg-white ${cbuError ? 'is-invalid' : ''}`}
                          onChange={(e) => {
                            setCbu(e.target.value);
                            setCbuError(null);
                          }}
                        />
                        {cbuError && <div className="invalid-feedback">{cbuError}</div>}
                      </div>

                      <div className="form-group mb-3">
                        <label className="form-label text-muted" style={{fontSize: 'medium'}}>Matricula *</label>
                        <input
                          type="text"
                          name="matricula"
                          className={`form-control bg-white ${matriculaError ? 'is-invalid' : ''}`}
                          onChange={(e) => {
                            setMatricula(e.target.value);
                            setMatriculaError(null);
                          }}
                        />
                        {matriculaError && <div className="invalid-feedback">{matriculaError}</div>}
                      </div>

                      <div className="form-group mb-3">
                        <label className="form-label text-muted">Fecha de pago *</label>
                        <input
                          type="date"
                          name="fecha_pago"
                          className={`form-control bg-white ${fechaPagoError ? 'is-invalid' : ''}`}
                          
                          onChange={(e) => {
                            setFechaPago(e.target.value);
                            setFechaPagoError(null);
                          }}
                        />
                        {fechaPagoError && <div className="invalid-feedback">{fechaPagoError}</div>}
                      </div>     
                  </div>
                </div>
              
              <div className="col-md-3">
                <div className="input-group mb-3" style={{ width: '100%' }}>
                  <label
                    className={`form-control ${fileError ? 'is-invalid' : ''}`}
                    style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', fontSize: 'small' }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        style={{ width: '2rem', height: '2rem', marginRight: '1rem' }}
                        viewBox="0 0 24 24"
                        strokeWidth="1"
                        stroke="currentColor"
                        className="w-4 h-4 mr-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                        />
                      </svg>
                      Adjuntar archivos *
                      <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={displayFileInfo}
                      />
                      
                    </label>
                    {fileError && <div className="invalid-feedback" style={{ display: 'block' }}>{fileError}</div>}
                  </div>
                </div>

                <div id="fileInfo" style={{ marginLeft: '3rem', display: 'none', fontSize: 'small' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>

                  <span id="fileName" style={{ color: '#78d278' }}>{files.map(file => file.name).join(', ')}</span>
                </div>
              <div className="form-group mt-3 float-end mt-3 ">
                <a href="/dashboard" className="btn btn-outline-primary">
                  Cancelar
                </a>
                <form onSubmit={handleSubmit} style={{display: 'inline-block'}}>
                  <button type="submit"  className="btn btn-outline-success ml-3"> Confirmar </button>
                </form>
              </div>
            </div>
          )}
        </div>             
      </div>
      </>
  );
};

export default SolicitarReintegro;