'use client';
import "./navbar.css";
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexto/userContext.jsx';

export default function Navbar() {
  const { username } = useContext(UserContext);
  const [usuarioNavbar, setUsuarioNavbar] = useState(username);

  useEffect(() => {
    setUsuarioNavbar(username); // Actualiza usuarioNavbar cuando username cambia
    console.log(username + 'usu');
  console.log(usuarioNavbar + 'navbar');
  }, [username]);


  return (
    <nav className="navbar navbar-expand-md navbar-light navbar shadow-sm">
      <div className="container-navbar">
        <a className="navbar-brand" href="/dashboard">
          <img src="/imagen.jpeg" alt="Imagen" style={{ width: "120px", height: "auto" }} />
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link">
              {usuarioNavbar} <i className="fas fa-user"></i>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Salir <i className="fas fa-user"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
