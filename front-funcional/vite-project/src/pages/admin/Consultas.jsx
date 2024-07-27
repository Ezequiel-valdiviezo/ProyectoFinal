import React, { useEffect, useState } from "react";
import '../../styles/adminConsultas.css';
import { useNavigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useColorContext } from '../../context/colorContext';

function Consultas() {
    const [consultas, setConsultas] = useState([]);
    const [modal, setModal] = useState(null)
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

    const handleMostrarDetalles = (index) => {
        setModal(consultas[index]);
        setFormData({ email: consultas[index].email, respuesta: '' });
    };

    const handleCerrarDetalles = () => {
        setModal(null);
    };

    const [formData, setFormData] = useState({
        email: "",
        respuesta: "",
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value
          });
      };

      const [message, setMessage] = useState('')

      const handleSubmitEmail = async (event) => {
        event.preventDefault();

        const formDataToSend = {
            email: formData.email,
            respuesta: formData.respuesta,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/enviar-email2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataToSend),
            });
    
            if (response.ok) {
                setMessage('Email enviado con éxito');
                handleCerrarDetalles();
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message}`);
            }
        } catch (error) {
            setMessage('Hubo un error al enviar el email');
        }
        };

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
                                    <td><button className="btn btn-outline-primary"  onClick={() => handleMostrarDetalles(index)}>Responder</button></td>
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

                {modal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="modal-close" onClick={handleCerrarDetalles}>&times;</span>
                            <h3 className="my-2">Responder consulta a {modal.nombre}</h3>
                            {/* <p className="text-start"><span className="fw-bold">Email:</span> {modal.email}</p> */}
                            <p className="text-start"><span className="fw-bold">Consulta:</span> {modal.mensaje}</p>

                            
                            <form onSubmit={handleSubmitEmail}>
                                <div className="form-group my-4">
                                    <label htmlFor="respuesta">Respuesta:</label>
                                    <textarea name="respuesta" id="respuesta" value={formData.respuesta} onChange={handleChange} />
                                </div>

                            <p>{message}</p>

                            <button className="btn btn-outline-primary" type="submit">Enviar</button>
                            <button className="btn btn-outline-primary" onClick={handleCerrarDetalles}>Cerrar</button>
                            </form>
                        </div>
                    </div>
                )}

                </div>
            </div>
        </>
    );
}

export default Consultas;