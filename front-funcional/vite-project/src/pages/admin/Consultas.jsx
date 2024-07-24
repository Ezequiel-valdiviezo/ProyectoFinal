import React, { useEffect, useState } from "react";
import '../../styles/adminConsultas.css';
import { useNavigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useColorContext } from '../../context/colorContext';

function Consultas() {
    const [consultas, setConsultas] = useState([]);
    //Guarda la pagina actual
    const [currentPage, setCurrentPage] = useState(1);
    //elementos a mostrar por pagina
    const [itemsPerPage] = useState(5);
    const navigate = useNavigate();
    const { colors, color } = useColorContext();
    const estiloTitulo = {
        color: color,
      };

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('user'));
        if (!usuario) {
            navigate('/login');
        } else if (usuario.user.role === "admin") {
            console.log("Todo bien");
        } else if (usuario.user.role === "user") {
            navigate('/home');
        }
    }, [navigate]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/consulta', { 
            method: 'GET',
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => setConsultas(data))
        .catch(error => console.error('Error fetch cursos:', error));
    }, []);

    // Calculan los indices de los elementos a mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Contiene los elementos de la página actual
    const currentItems = Array.isArray(consultas) ? consultas.slice(indexOfFirstItem, indexOfLastItem) : [];

    // Cambia la pagina al numero seleccionado
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="vh-100">
                <div className="consultas pt-5 text-center">
                    <div className="saludo">
                        <h2 style={estiloTitulo}>Consultas</h2>
                    </div>
                    
                {Array.isArray(consultas) && consultas.length > 0 ? (
                    <div>
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Mensaje</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((consulta, index) => (
                                <tr key={index}>
                                    <td>{consulta.email}</td>
                                    <td>{consulta.nombre}</td>
                                    <td>{consulta.mensaje}</td>
                                    <td><button className="btn btn-outline-primary">Responder</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Anterior</a>
                            </li>
                            {[...Array(Math.ceil(consultas.length / itemsPerPage)).keys()].map(number => (
                                <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                                    <a className="page-link" href="#" onClick={() => paginate(number + 1)}>
                                        {number + 1}
                                    </a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === Math.ceil(consultas.length / itemsPerPage) ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Siguiente</a>
                            </li>
                        </ul>
                    </nav>
                    </div>

                    ) : (
                        <p>No se encontraron consultas.</p>
                    )}

                </div>
            </div>
        </>
    );
}

export default Consultas;
