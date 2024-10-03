import React, { useEffect, useState } from "react";
import '../styles/medicos.css'
import { useColorContext } from '../context/colorContext';
import { useNavigate } from "react-router-dom";

function Medicos(){
    const [medicos, setMedicos] = useState([]);
    const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
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
        fetch('http://127.0.0.1:8000/api/medicos', {
            method: 'GET',
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => {setMedicos(data);
            setLoading(false);
        })
        .catch(error => {console.error('Error fetch cursos:', error);
            setLoading(false);
        });
    }, []);

    const handleMostrarDetalles = (index) => {
        setMedicoSeleccionado(medicos[index]);
    };

    const handleCerrarDetalles = () => {
        setMedicoSeleccionado(null);
    };

    return(
        <div className="fondoMedicos">
            <div className="medicos text-center">
                <h2 className="pt-5" style={estiloTitulo}>Médicos</h2>

                {loading ? ( 
                            <div className="alert d-flex justify-content-center mt-5 mx-5" role="alert">
                                <div class="spinner-border text-primary m-auto" role="status">
                                <span class="visually-hidden">Cargando...</span>
                                </div>
                            </div>
                    ) : (

                <div className="d-flex flex-wrap justify-content-center">
                {Array.isArray(medicos) && medicos.length > 0 ? (
                        medicos.map((medico, index) => (
                            <div className="card medico m-2 text-start" style={{ width: '18rem' }} key={index}>
                                <img src={'http://127.0.0.1:8000/' + medico.imagen} width="100%" className="card-img-top" alt="" />
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <h3 className="card-title">{medico.titulo}</h3>
                                    </li>
                                    <li className="list-group-item">Nombre: {medico.nombre}</li>
                                    <li className="list-group-item">Especialidad: {medico.especialidad}</li>
                                    <li className="list-group-item">Teléfono: {medico.telefono}</li>
                                    <li className="list-group-item">Precio: ${medico.precio}</li>
                                    <li className="list-group-item">
                                        <button className="btn btn-outline-primary m-1" onClick={() => handleMostrarDetalles(index)}>Ver Detalles</button>
                                        <button className="btn btn-primary" >Contactar</button>
                                        {/* <button className="btn btn-outline-primary m-1">Continuar</button> */}
                                    </li>
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron médicos.</p>
                    )}
                </div>

                    )}

                {medicoSeleccionado && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="modal-close" onClick={handleCerrarDetalles}>&times;</span>
                            <img src={'http://127.0.0.1:8000/' + medicoSeleccionado.imagen} width="100%" className="card-img-top" alt="" />
                            <h3 className="my-2">Detalles del médico</h3>
                            <p className="text-start"><span className="fw-bold">Nombre:</span> {medicoSeleccionado.nombre}</p>
                            <p className="text-start"><span className="fw-bold">Descripción:</span> {medicoSeleccionado.descripcion}</p>
                            <p className="text-start"><span className="fw-bold">Categoría:</span> {medicoSeleccionado.especialidad}</p>
                            <p className="text-start"><span className="fw-bold">Teléfono:</span> {medicoSeleccionado.telefono}</p>
                            <p className="text-start"><span className="fw-bold">Precio</span>: ${medicoSeleccionado.precio}</p>
                            <div>

                            <button className="btn btn-outline-primary mx-1" onClick={handleCerrarDetalles}>Cerrar</button>
                            <button className="btn btn-primary mx-1" >Contactar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Medicos;