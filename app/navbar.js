"use client";

import  "./globals.css";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';


export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    window.location.href = "/login";
  };
    const usuario = localStorage.getItem('nombre');
    

    return (
      <>
        <div className="navbar navbar-expand-md navbar-light navbar shadow-sm">
            <div className="container" >
                <a className="navbar-brand" href="/dashboard">
                    <img src="/imagen.jpeg" alt="Imagen" style={{ width: '120px', height: 'auto' }} />
                </a>
                <div className="d-flex align-items-center">
                  <h6 className="ms-2">{usuario} <FontAwesomeIcon icon={faUser} /> </h6>
                  <Button variant="outline-success" onClick={handleLogout} className="ms-2">
                  <FontAwesomeIcon icon={faSignOutAlt} /> 
                </Button>
                </div>
                
                
            </div>
        </div>
      </>
    );
  
}