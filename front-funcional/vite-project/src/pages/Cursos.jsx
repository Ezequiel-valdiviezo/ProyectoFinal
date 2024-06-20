import React, {useState, useEffect} from "react";
import '../styles/cursos.css';
import img from '../assets/1.png'

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

    const handleMostrarDetalles = (index) => {
        setCursoSeleccionado(cursos[index]);
    };

    const handleCerrarDetalles = () => {
        setCursoSeleccionado(null)
    }

    return(
        <div className="cursos text-center">
        <h2 className="mt-5">Cursos</h2>
        
                <div className="d-flex flex-wrap justify-content-center">
                    {cursos.map((curso, index) => (
                        // <div className="CardCurso" key={index}>
                            <div className="card curso m-2" style={{ width: '18rem' }}>
                                <img src={img} width="100%" className="card-img-top" alt="" />
                                {/* <img src={curso.imagen} width="100%" className="card-img-top" alt="" /> */}
                                
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
                                    </li>
                                </ul>
                            </div>
                        // </div>
                    ))}
                </div>

            {cursoSeleccionado && (
                <div className="detalles-curso">
                    <h3>Detalles del Curso</h3>
                    <p>Título: {cursoSeleccionado.titulo}</p>
                    <p>Descripción: {cursoSeleccionado.descripcion_completa}</p>
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