"use client";
import { useState } from 'react';
import './login.css';
import axios from 'axios'; 
import Link from 'next/link';


export default function Login() {
  const [usuario, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usuario.trim() === '' || password.trim() === '') {
      setError('Por favor, complete todos los campos.');
    } else {
      try {
        const response = await login(usuario, password);
      } catch (error) {
        setError('Se produjo un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  };

  const login = async (usuario, password) => {
    try {
      const response = await axios.post('https://ospifak-backend-ecyuhbcpe-opsifak.vercel.app/rest/login', { usuario, password });
      console.log(response);
      if (response.status==200) {
        // Almacenar el token de sesión en localStorage
        localStorage.setItem('token', response.data.token);
        window.location.href = '/inicio';
        
      } else {
        setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      setError('Se produjo un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="login-box">
          <h1>Iniciar Sesión</h1>
          <div>
            <label htmlFor="usuario">Usuario:</label>
            <input
              type="text"
              id="usuario"
              value={usuario}
              onChange={handleUserChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className='rememberMe'>
            <label >
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              Recordarme
            </label>
          </div>
          {error && <p className="error">{error}</p>}
          <a href="{{ route('password.request') }}" className="forgot-password">
            Olvidé mi contraseña
          </a>
          <button type='submit'>Iniciar sesión</button>
        </div>
      </form>
    </div>
  );
}
