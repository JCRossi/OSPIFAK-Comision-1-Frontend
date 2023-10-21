"use client"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Menor(){
    function redireccionarARegistrarMenor() {
        window.location.href = '/registrarMenor';
      }
      
    return (
        <>
          <a className="navbar-brand" href="/dashboard">
            <img src="/imagen.jpeg" alt="Imagen" style={{ width: '120px', height: 'auto' }} />
          </a>
            <h1 className='altaCliente'>Alta Menor a Cargo</h1>
            <Button variant="outline-success" onClick={ redireccionarARegistrarMenor()}>Guardar datos</Button>



        
        </>
    )
}