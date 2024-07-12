import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate  } from "react-router-dom";
import "../styles/header.css";
import img from '../assets/logo.png'

function Header() {
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('user'));
    if (usuario && usuario.user.role) {
      setUserRole(usuario.user.role);
    } else {
      navigate('/home'); // Redirigir a la página de inicio si no hay usuario o rol
    }
  }, [navigate]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/logout', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json'
        // },
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
      // window.location.href = '/login';
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
            {userRole === 'user' && (
                <>
              <li className="nav-item">
                <NavLink className="nav-link text-white colorNav fw-bold" to="/home" activeClassName="active" aria-current="page">Inicio</NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle text-white colorNav fw-bold" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Funcionalidades
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/albumRecuerdos">Álbum de recuerdos</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/anotador">Anotador</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/registrosMedicos">Registros médicos</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white colorNav fw-bold" to="/cursos" activeClassName="active" aria-current="page">Cursos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white colorNav fw-bold" to="/medicos" activeClassName="active" aria-current="page">Médicos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white colorNav fw-bold" to="/foro" activeClassName="active" aria-current="page">Foro</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white colorNav fw-bold" to="/perfil" activeClassName="active" aria-current="page">Mi perfil</NavLink>
              </li>
              </>
              )}
              {userRole === 'admin' && (
                <>
                <li className="nav-item">
                  <NavLink className="nav-link text-white colorNav fw-bold" to="/admin/panelAdmin" activeClassName="active" aria-current="page">Panel Admin</NavLink>
                </li>
                

                <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle text-white colorNav fw-bold" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Cursos
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/admin/cursos">Postulaciones</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/admin/cursos/manejos">Lista</Link></li>
                </ul>
              </li>
                <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle text-white colorNav fw-bold" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Médicos
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/admin/medicos">Postulaciones</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/admin/medicos/manejos">Lista</Link></li>
                </ul>
              </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white colorNav fw-bold" to="/admin/consultas" activeClassName="active" aria-current="page">Consultas</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white colorNav fw-bold" to="/admin/blog" activeClassName="active" aria-current="page">Blog</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white colorNav fw-bold" to="/admin/usuarios" activeClassName="active" aria-current="page">usuarios</NavLink>
                </li>
                </>
              )}
              <li>
                <form onSubmit={handleLogout} className="d-flex">
                  <button className="btn btn-outline-light mx-3 botonIniciarSesion" type="submit">Cerrar sesión</button>
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
