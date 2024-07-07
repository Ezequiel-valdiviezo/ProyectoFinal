import React, { useEffect, useState } from "react";
import '../../styles/adminConsultas.css'
import { useNavigate } from "react-router-dom";


function Consultas(){
    const [consultas, setConsultas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('user'));
        if(usuario.user.role == "admin"){
            console.log("Todo bien");
        }else{
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

    return(
        <>
            <div className="vh-100">
            <div className="consultas pt-5 text-center">

                <div className="saludo">
                {/* <img src={img} width="100px" alt="" /> */}
                <h2>Consultas</h2>
                </div>
                
                <table class="table table-striped table-hover">
                    <thead class="table-dark">
                        <tr>
                            {/* <th scope="col">#</th> */}
                            <th scope="col">Email</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Mensaje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultas.map((consulta) => (
                            <tr>
                                <td>{consulta.nombre}</td>
                                <td>{consulta.email}</td>
                                <td>{consulta.mensaje}</td>
                            </tr>
                        ))}
                        <tr>
                            {/* <th scope="row">1</th> */}
                            <td>ejemplo1@correo.com</td>
                            <td>Juan Pérez</td>
                            <td>Hola, me gustaría saber más sobre sus servicios. </td>
                        </tr>
                        <tr>
                            {/* <th scope="row">2</th> */}
                            <td>ejemplo2@correo.com</td>
                            <td>María López</td>
                            <td>¿Pueden enviarme un catálogo de productos?</td>
                        </tr>
                        <tr>
                            {/* <th scope="row">3</th> */}
                            <td>ejemplo3@correo.com</td>
                            <td>Carlos García</td>
                            <td>Tengo un problema con mi cuenta, ¿me pueden ayudar?</td>
                        </tr>
                    </tbody>
                </table>


                
            </div>
            </div>
        </>
    )
}

export default Consultas;