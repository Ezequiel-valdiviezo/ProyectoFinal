import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/header.css";

function Header() {
  const [error, setError] = useState('');

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });

      // if (!response.ok) {
      //   throw new Error('Error al cerrar sesión');
      // }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      // Asume que el cierre de sesión fue exitoso y redirige al inicio
      console.log("Proceso terminado");
      // Redireccionar al login o home después del cierre de sesión
      window.location.href = '/login';
    } catch (error) {
      console.error('Error:', error);
      setError('Hubo un problema con el cierre de sesión. Intenta de nuevo.');
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light ">
        <div className="container-fluid d-flex justify-content-between align-items-center anchoNav">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home" activeClassName="active" aria-current="page">Inicio</NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Funcionalidades
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/cursos">Cursos</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/albumRecuerdos">Álbum de recuerdos</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/anotador">Anotador</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/foro" activeClassName="active" aria-current="page">Foro</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/perfil" activeClassName="active" aria-current="page">Mi perfil</NavLink>
              </li>
              <li>
                <form onSubmit={handleLogout} className="d-flex">
                  <button className="btn btn-outline-primary botonIniciarSesion" type="submit">Cerrar sesión</button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {error && <p className="text-danger">{error}</p>}
    </>
  );
}

export default Header;
