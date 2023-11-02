"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { solicitarBaja } from './bajasFetch';
import './bajas.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Bajas() {
  const [solicitudBaja, setSolicitudBaja] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const handleSolicitudBaja = async () => {
      try {
          setLoading(true);
          const usuario = localStorage.getItem('nombre');
          const response = await solicitarBaja(usuario);
          setSolicitudBaja(response);

      } catch (error) {
        console.log(error);
        toast.error('Error al procesar la solicitud de baja');
      } finally {
          setLoading(false);
      }
  }

  useEffect(() => {
    if (!loading) {
      if (solicitudBaja.message == 'Baja solicitada con éxito'){
        toast.success(solicitudBaja.message);
      } else {
        toast.error(solicitudBaja.message);
      }
    } 
  }, [loading]);


  return (
    <>
      <div className="solicitar" onClick={handleSolicitudBaja}>
        <FontAwesomeIcon icon={faCirclePlus}/> Solicitar Baja
      </div>
    </>
  );
}
