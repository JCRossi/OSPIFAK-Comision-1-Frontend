"use client";
import { useState } from 'react';
import './login.css';

export default function Login() {
  const [user, setUser] = useState('');
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

    if (user.trim() === '' || password.trim() === '') {
      setError('Por favor, complete todos los campos.');
    } else {
      try {
        const response = await login(user, password);

        if (response.success) {
          // Almacenar el token de sesión en localStorage
          localStorage.setItem('token', response.token);

          // Autenticación exitosa, redirige al usuario a la página deseada
          router.push('/inicio');
        } else {
          setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        }
      } catch (error) {
        setError('Se produjo un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  };

  const login = async (user, password) => {
    // Realizar una solicitud al servidor para autenticar al usuario
    // y obtener un token de sesión
    // Debes adaptar esto a tu servidor real y lógica de autenticación
    return axios.post(`/api/login`, { user, password });
    // Simulación de una respuesta exitosa (debes adaptar esto a tu servidor real)
    /* if (user === 'usuario@ejemplo.com' && password === 'contraseña') {
      return { success: true, token: 'token_de_prueba' };
    } else {
      return { success: false, token: null };
    }*/
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="login-box">
          <h1>Iniciar Sesión</h1>
          <div>
            <label htmlFor="user">Usuario:</label>
            <input
              type="text"
              id="user"
              value={user}
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
          <button type="submit">Ingresar</button>
        </div>
      </form>
    </div>
  );
}
