import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/adminMedicos.css'
import { useColorContext } from '../../context/colorContext';

function Medicos(){
    const [consultas, setConsultas] = useState([]);
    const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
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
        fetch('http://127.0.0.1:8000/api/consulta/medicos', { 
            method: 'GET',
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => setConsultas(data))
        .catch(error => console.error('Error fetch cursos:', error));
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/consulta/medicos/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if(response.ok){
                console.log("Postulación médico eliminado correctamente");
                setConsultas(consultas.filter(consulta => consulta.id !== id));
            }else {
                console.error("Error al eliminar la nota")
            }
        } catch (error) {
            console.log("Error en la solicitus de eliminació", error);
        }
      }

      const handleMostrarDetalles = (index) => {
        setMedicoSeleccionado(consultas[index]);
    };

    const handleCerrarDetalles = () => {
        setMedicoSeleccionado(null);
    };


    const [emailUser, setEmailUser] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmitEmail = async (emailUser) => {
    // e.preventDefault();
        // setEmail(emailUser);
    try {
        const response = await fetch('http://127.0.0.1:8000/api/enviar-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailUser }),
        });

        if (response.ok) {
            setMessage('Email enviado con éxito');
        } else {
            const errorData = await response.json();
            setMessage(`Error: ${errorData.message}`);
        }
    } catch (error) {
        setMessage('Hubo un error al enviar el email');
    }
    };


    return(
        <>
            <div className="vh-100">
                <div className="adminMedicosConsultas pt-5 text-center">

                    <div className="saludo">
                        <h2 style={estiloTitulo}>Postulación para ofrecer servicios de médico</h2>
                    </div>
                
                    {Array.isArray(consultas) && consultas.length > 0 ? (
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Nombre</th>
                                {/* <th scope="col">Especialidad</th> */}
                                <th scope="col">Descripción servicio</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {consultas.map((consulta, index) => (
                                <tr key={index}>
                                    <td>{consulta.email}</td>
                                    <td>{consulta.nombre}</td>
                                    <td>{consulta.descripcion_servicio}</td>
                                    <td>
                                    <button className="btn btn-outline-primary" onClick={() => {handleSubmitEmail(consulta.email)}}>Aceptar</button>
                                    </td>
                                        <button className="btn btn-outline-primary"  onClick={() => handleMostrarDetalles(index)}>Detalles</button>
                                    <td>
                                        <button className="btn btn-outline-danger" onClick={() => handleDelete(consulta.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    ) : (
                        <p>No se encontró postulación de médicos.</p>
                    )}

                {medicoSeleccionado && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="modal-close" onClick={handleCerrarDetalles}>&times;</span>
                            <img src={'http://127.0.0.1:8000/' + medicoSeleccionado.matricula} width="100%" className="card-img-top" alt="" />
                            <h3 className="my-2">Detalles del médico</h3>
                            <p className="text-start"><span className="fw-bold">Nombre:</span> {medicoSeleccionado.nombre}</p>
                            <p className="text-start"><span className="fw-bold">Especialidad:</span> {medicoSeleccionado.especialidad}</p>
                            <p className="text-start"><span className="fw-bold">Descripción:</span> {medicoSeleccionado.descripcion_servicio}</p>
                            <button className="btn btn-outline-primary" onClick={handleCerrarDetalles}>Cerrar</button>
                        </div>
                    </div>
                )}

                </div>
            </div>
        </>
    )
}

export default Medicos;