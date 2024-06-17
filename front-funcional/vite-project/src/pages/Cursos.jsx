import React, {useState, useEffect} from "react";
import '../styles/cursos.css';

function Cursos(){

    const [cursos, setCursos] = useState([]);
    const [mostrarCursos, setMostrarCursos] = useState(false);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/cursos', {
            method: 'GET',
            credentials: 'include'
        }
        )
            .then(response => response.json())
            .then(data => setCursos(data))
            .catch(error => console.error('Error fetching cursos:', error));
    }, []);

    const handleMostrarCursos = () => {
        setMostrarCursos(true);
    };

    const handleOcultarCursos = () => {
        setMostrarCursos(false);
    };

    const handleMostrarDetalles = (index) => {
        setCursoSeleccionado(cursos[index]);
    };

    const handleCerrarDetalles = () => {
        setCursoSeleccionado(null)
    }

    return(
        <div className="cursos text-center">
        <h2>Cursos</h2>
        <button onClick={handleMostrarCursos}>Mostrar Cursos</button>
        <button onClick={handleOcultarCursos}>Ocultar Cursos</button>

        {mostrarCursos && (
                <div className="d-flex flex-wrap justify-content-center">
                    {cursos.map((curso, index) => (
                        // <div className="CardCurso" key={index}>
                            <div className="card m-2" style={{ width: '18rem' }}>
                                <img src="" className="card-img-top" alt="" />
                                <div className="card-body">
                                    <h3 className="card-title">{curso.titulo}</h3>
                                    <p className="card-text">{curso.descripcion_breve}</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{curso.categoria}</li>
                                    <li className="list-group-item">{curso.telefono}</li>
                                    <li className="list-group-item">{curso.precio}</li>
                                </ul>
                                <div className="card-body">
                                    <button onClick={() => handleMostrarDetalles(index)}>Ver Detalles</button>
                                </div>
                            </div>
                        // </div>
                    ))}
            </div>
        )}

            {cursoSeleccionado && (
                <div className="detalles-curso">
                    <h3>Detalles del Curso</h3>
                    <p>Título: {cursoSeleccionado.titulo}</p>
                    <p>Descripción: {cursoSeleccionado.descripcion_larga}</p>
                    <p>Categoría: {cursoSeleccionado.categoria}</p>
                    <p>Teléfono: {cursoSeleccionado.telefono}</p>
                    <p>Precio: {cursoSeleccionado.precio}</p>
                    <button onClick={handleCerrarDetalles}>Cerrar</button>
                </div>
            )}
        </div>
    )
}

export default Cursos;