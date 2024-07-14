import React, { useEffect, useState } from "react";
import '../styles/medicos.css'
import { useColorContext } from '../context/colorContext';

function Medicos(){
    const [medicos, setMedicos] = useState([]);
    const { colors, color } = useColorContext();
    const estiloTitulo = {
        color: color,
      };

      useEffect(() => {
        fetch('http://127.0.0.1:8000/api/medicos', {
            method: 'GET',
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => setMedicos(data))
        .catch(error => console.error('Error fetch cursos:', error));
    }, []);

    return(
        <div className="fondoMedicos">
            <div className="medicos text-center">
                <h2 className="pt-5" style={estiloTitulo}>Médicos</h2>

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
                                        <button className="btn btn-outline-primary m-1">Ver Detalles</button>
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
            </div>
        </div>
    )
}

export default Medicos;