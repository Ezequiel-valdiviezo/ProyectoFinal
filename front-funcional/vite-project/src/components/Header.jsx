import React from "react";

function Header(){

    return(
        <>
        <nav class="navbar navbar-expand-md navbar-light bg-light">
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
                    <form class="d-flex">
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