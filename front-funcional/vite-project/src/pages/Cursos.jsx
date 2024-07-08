import React, { useState, useEffect } from "react";
import '../styles/cursos.css';
import img from '../assets/1.png';

function Cursos() {

    const [cursos, setCursos] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);


    const phoneNumber = "3410000000"; // Reemplaza con el número de teléfono en formato internacional
    const message = "Hola, me gustaría saber más sobre su curso posteado en NatUser.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/cursos', {
            method: 'GET',
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => setCursos(data))
        .catch(error => console.error('Error fetch cursos:', error));
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
                    {/* {cursos.map((curso, index) => (
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
                    ))} */}
                     {Array.isArray(cursos) && cursos.length > 0 ? (
                        cursos.map((curso, index) => (
                            <div className="card curso m-2 text-start" style={{ width: '18rem' }} key={index}>
                                <img src={'http://127.0.0.1:8000/' + curso.imagen} width="100%" className="card-img-top" alt="" />
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <h3 className="card-title">{curso.titulo}</h3>
                                    </li>
                                    <li className="list-group-item">Categoría: {curso.categoria}</li>
                                    <li className="list-group-item">Teléfono: {curso.telefono}</li>
                                    <li className="list-group-item">Precio: ${curso.precio}</li>
                                    <li className="list-group-item">
                                        <button className="btn btn-outline-primary m-1" onClick={() => handleMostrarDetalles(index)}>Ver Detalles</button>
                                        <button className="btn btn-primary" onClick={() => {
                                            const phoneNumber = curso.telefono;
                                            const message = `Hola, me gustaría saber más sobre su curso: ${curso.titulo}.`;
                                            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                                            window.open(url, "_blank");
                                        }}>Contactar</button>
                                        {/* <button className="btn btn-outline-primary m-1">Continuar</button> */}
                                    </li>
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron cursos.</p>
                    )}
                </div>

                {cursoSeleccionado && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="modal-close" onClick={handleCerrarDetalles}>&times;</span>
                            <img src={'http://127.0.0.1:8000/' + cursoSeleccionado.imagen} width="100%" className="card-img-top" alt="" />
                            <h3 className="my-2">Detalles del Curso</h3>
                            <p className="text-start"><span className="fw-bold">Título:</span> {cursoSeleccionado.titulo}</p>
                            <p className="text-start"><span className="fw-bold">Descripción:</span> {cursoSeleccionado.descripcion_completa}</p>
                            <p className="text-start"><span className="fw-bold">Categoría:</span> {cursoSeleccionado.categoria}</p>
                            <p className="text-start"><span className="fw-bold">Teléfono:</span> {cursoSeleccionado.telefono}</p>
                            <p className="text-start"><span className="fw-bold">Precio</span>: ${cursoSeleccionado.precio}</p>
                            <button className="btn btn-outline-primary" onClick={handleCerrarDetalles}>Cerrar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cursos;
