import React, { useState, useEffect } from "react";
import '../styles/cursos.css';
import img from '../assets/1.png';

function Cursos() {

    const [cursos, setCursos] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);


    const phoneNumber = "3410000000"; // Reemplaza con el número de teléfono en formato internacional
    const message = "Hola, me gustaría saber más sobre sus servicios.";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/cursos', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => setCursos(data))
        .catch(error => console.error('Error fetching cursos:', error));
    }, []);

    const handleMostrarDetalles = (index) => {
        setCursoSeleccionado(cursos[index]);
    };

    const handleCerrarDetalles = () => {
        setCursoSeleccionado(null);
    };

    return (
        <div className="fondoCursos">
            <div className="cursos text-center">
                <h2 className="pt-5">Cursos</h2>

                <div className="d-flex flex-wrap justify-content-center">
                    {cursos.map((curso, index) => (
                        <div className="card curso m-2" style={{ width: '18rem' }} key={index}>
                            <img src={'http://127.0.0.1:8000' + curso.imagen} width="100%" className="card-img-top" alt="" />
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <h3 className="card-title">{curso.titulo}</h3>
                                </li>
                                <li className="list-group-item">Categoria: {curso.categoria}</li>
                                <li className="list-group-item">Teléfono: {curso.telefono}</li>
                                <li className="list-group-item">Precio: ${curso.precio}</li>
                                <li className="list-group-item">
                                    <button className="btn btn-outline-primary m-1" onClick={() => handleMostrarDetalles(index)}>Ver Detalles</button>
                                    <button className="btn btn-outline-primary m-1">Continuar</button>
                                    <button className="btn btn-primary" onClick={() => window.open(url, "_blank")}>Contactar por WhatsApp</button>
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>

                {cursoSeleccionado && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="modal-close" onClick={handleCerrarDetalles}>&times;</span>
                            <h3>Detalles del Curso</h3>
                            <p>Título: {cursoSeleccionado.titulo}</p>
                            <p>Descripción: {cursoSeleccionado.descripcion_completa}</p>
                            <p>Categoría: {cursoSeleccionado.categoria}</p>
                            <p>Teléfono: {cursoSeleccionado.telefono}</p>
                            <p>Precio: ${cursoSeleccionado.precio}</p>
                            <button onClick={handleCerrarDetalles}>Cerrar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cursos;
