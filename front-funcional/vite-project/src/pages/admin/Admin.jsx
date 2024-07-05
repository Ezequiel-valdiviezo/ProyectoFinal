import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/admin.css'

function Admin(){
    const navigate = useNavigate();

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('user'));
        if(usuario.user.role == "admin"){
            console.log("Todo bien");
        }else{
            navigate('/home');
        }
    }, [navigate]);

    return(
        <div className="fondoPanelAdmin vh-100">
        <div className="panelAdmin pt-5 text-center">

            <div className="saludo">
            {/* <img src={img} width="100px" alt="" /> */}
            <h2>¡Panel administrador de <span id="nat">Nat</span><span id="user">User</span>!</h2>
            {/* <p>¡Nos alegra tenerte por acá!</p> */}
            </div>
            
            <div className="funcionalidades p-4 mt-2">
            <h2>Desde acá vas a poder administrar los servicios principales de NatUser</h2>

            <div className="d-flex flex-wrap justify-content-beetwen align-items-center  mt-4">
                <div className="funcMini py-2 px-4 m-auto">
                    <p>Médicos</p>
                </div>
                <div className="funcMini py-2 px-4 m-auto">
                    <p>Cursos</p>
                </div>
                <div className="funcMini py-2 px-4 m-auto">
                    <p>Usuarios</p>
                </div>
            </div>
            </div>

            
        </div>
        </div>
    )
}

export default Admin;