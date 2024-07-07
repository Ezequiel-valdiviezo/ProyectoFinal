import React, { useEffect, useState } from "react";
import '../../styles/adminUsuarios.css'
import { useNavigate } from "react-router-dom";

function Usuarios(){
    const [usuarios, setUsuarios] = useState([]);
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
                <h2>Consultas</h2>
                </div>
                
                <table class="table table-striped table-hover">
                    <thead class="table-dark">
                        <tr>
                            {/* <th scope="col">#</th> */}
                            <th scope="col">Email</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr>
                                <td>{usuario.email}</td>
                                <td>{usuario.name}</td>
                                <td>{usuario.role}</td>
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