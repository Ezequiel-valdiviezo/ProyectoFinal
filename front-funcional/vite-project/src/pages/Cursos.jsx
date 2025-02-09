import React, { useState, useEffect } from "react";
import '../styles/cursos.css';
import img from '../assets/1.png';
import { useColorContext } from '../context/colorContext';
import { useNavigate } from "react-router-dom";

function Cursos() {

    const [cursos, setCursos] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
    const navigate = useNavigate();
    const { colors, color } = useColorContext();
    const estiloTitulo = {
        color: color,
      };
      const [loading, setLoading] = useState(false);


    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('user'));
        if (!usuario) {
            navigate('/login');
        } else if (usuario.user.role === "admin") {
            navigate('/panel/admin');
        } else if (usuario.user.role === "user") {
            console.log("Todo bien");
        }
    }, [navigate]);

    useEffect(() => {
        setLoading(true);

        fetch('http://127.0.0.1:8000/api/cursos', {
            method: 'GET',
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => {setCursos(data);
            setLoading(false);
        })
        .catch(error => {console.error('Error fetch cursos:', error);
            setLoading(false);
        });
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
                <h2 className="pt-5" style={estiloTitulo}>Cursos</h2>

                {loading ? ( 
                            <div className="alert d-flex justify-content-center mt-5 mx-5" role="alert">
                                <div class="spinner-border text-primary m-auto" role="status">
                                <span class="visually-hidden">Cargando...</span>
                                </div>
                            </div>
                    ) : (

                <div className="d-flex flex-wrap justify-content-center">

                     {Array.isArray(cursos) && cursos.length > 0 ? (
                        cursos.map((curso, index) => (
                            <div className="card curso m-2 d-flex flex-column text-start" style={{ width: '18rem', minHeight: '25rem' }} key={index}>
                                <img src={'http://127.0.0.1:8000/' + curso.imagen} width="100%" className="card-img-top" alt="" />
                                <ul className="list-group list-group-flush flex-grow-1">
                                    <li className="list-group-item" style={{ minHeight: '4rem' }}>
                                        <h3 className="card-title">{curso.titulo}</h3>
                                    </li>
                                    <li className="list-group-item">Categoría: {curso.categoria}</li>
                                    <li className="list-group-item">Teléfono: {curso.telefono}</li>
                                    <li className="list-group-item">Precio: ${curso.precio}</li>
                                    <li className="list-group-item mt-auto">
                                        <button className="btn btn-outline-primary m-1" onClick={() => handleMostrarDetalles(index)}>Ver Detalles</button>
                                        <button className="btn btn-primary" onClick={() => {
                                            const phoneNumber = curso.telefono;
                                            const message = `Hola, me gustaría saber más sobre su curso: ${curso.titulo}.`;
                                            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                                            window.open(url, "_blank");
                                        }}>Contactar</button>
                                    </li>
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron cursos.</p>
                    )}
                </div>

                    )}

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
                            <div className="">
                            <button className="btn btn-outline-primary mx-1" onClick={handleCerrarDetalles}>Cerrar</button>
                            <button className="btn btn-primary mx-1" onClick={() => {
                                            const phoneNumber = curso.telefono;
                                            const message = `Hola, me gustaría saber más sobre su curso: ${curso.titulo}.`;
                                            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                                            window.open(url, "_blank");
                                        }}>Contactar</button>
                            </div>
                            
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cursos;
