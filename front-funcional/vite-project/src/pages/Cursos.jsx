import React, {useState, useEffect} from "react";

function Cursos(){

    const [cursos, setCursos] = useState([]);
    const [mostrarCursos, setMostrarCursos] = useState(false);

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

    return(
        <>
        <h2>Cursos</h2>
        <button onClick={handleMostrarCursos}>Mostrar Cursos</button>
        <button onClick={handleOcultarCursos}>Ocultar Cursos</button>

        {mostrarCursos && (
            <ul>
            {cursos.map((curso, index) => (
                <li key={index}>{curso.nombre}</li>
            ))}
            </ul>
        )}
        </>
    )
}

export default Cursos;