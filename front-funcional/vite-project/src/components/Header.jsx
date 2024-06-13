import React, { useState } from "react";
import "../styles/header.css"

function Header(){
    
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
    
          if (!response.ok) {
            throw new Error('Error al cerrar sesión');
          }
    
          const data = await response.json();
          console.log('Respuesta del servidor:', data);
    
          // Asume que el cierre de sesión fue exitoso y llama a onLogin para redirigir a Home
          console.log("Proceso terminado");
          // onLogin();
        } catch (error) {
          console.error('Error:', error);
          setError('Hubo un problema con el cierre de sesión. Intenta de nuevo.');
        }
      };

    return(
        <>
        <nav class="navbar navbar-expand-sm navbar-light ">
            <div class="container-fluid d-flex justify-content-between align-items-center anchoNav">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Inicio</a>
                    </li>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Funcionalidades
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Foro</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Mi perfil</a>
                    </li>
                    <li>
                    <form onSubmit={handleLogout} class="d-flex">
                        <button class="btn btn-outline-primary botonIniciarSesion" type="submit">Cerrar sesión</button>
                    </form>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        
        </>
    )
}

export default Header;