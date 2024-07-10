import React, { useEffect, useState } from "react";
import '../../styles/adminUsuarios.css'
import { useNavigate } from "react-router-dom";
import { useColorContext } from '../../context/colorContext';

function Usuarios(){
    const [usuarios, setUsuarios] = useState([]);
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
        fetch('http://127.0.0.1:8000/api/users', { 
            method: 'GET',
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => setUsuarios(data))
        .catch(error => console.error('Error fetch cursos:', error));
        }, []);

    return(
        <>
            <div className="vh-100">
            <div className="usuarios pt-5 text-center">

                <div className="saludo">
                {/* <img src={img} width="100px" alt="" /> */}
                <h2 style={estiloTitulo}>Usuarios</h2>
                </div>
                
                <table class="table table-striped table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">Email</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Rol</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr>
                                <td>{usuario.email}</td>
                                <td>{usuario.name}</td>
                                <td>{usuario.role}</td>
                                <td><button className="btn btn-outline-danger">Eliminar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                
            </div>
            </div>
        </>
    )
}

export default Usuarios;