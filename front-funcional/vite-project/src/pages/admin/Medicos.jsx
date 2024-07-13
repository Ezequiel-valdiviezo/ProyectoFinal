import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/adminMedicos.css'
import { useColorContext } from '../../context/colorContext';

function Medicos(){
    const [consultas, setConsultas] = useState([]);
    const navigate = useNavigate();
    const { colors, color } = useColorContext();
    const estiloTitulo = {
        color: color,
      };

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('user'));
        if(usuario.user.role == "admin"){
            console.log("Todo bien");
        }else{
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

    return(
        <>
            <div className="vh-100">
                <div className="adminMedicos pt-5 text-center">

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
                            </tr>
                        </thead>
                        <tbody>
                            {consultas.map((consulta, index) => (
                                <tr key={index}>
                                    <td>{consulta.email}</td>
                                    <td>{consulta.nombre}</td>
                                    {/* <td>{consulta.especialidad}</td> */}
                                    <td>{consulta.descripcion_servicio}</td>
                                    <td>
                                        <button className="btn btn-outline-primary">Aceptar</button>
                                    </td>
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

                </div>
            </div>
        </>
    )
}

export default Medicos;