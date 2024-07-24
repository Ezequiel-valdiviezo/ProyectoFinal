import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/admin.css'
import img from '../../assets/logo.png'
import { useColorContext } from '../../context/colorContext';

function Admin(){
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

    return(
        <div className="fondoPanelAdmin vh-100">
        <div className="panelAdmin pt-5 text-center">

            <div className="">
            <h2 style={estiloTitulo}>¡Panel administrador de <span id="nat">Nat</span><span id="user">User</span>!</h2>
            <img src={img} width="100px" alt="" />

            <p className="mt-5 fs-5">Desde acá vas a poder administrar todas las funcionalidades del sitio. 
                Tenés acceso completo para manejar usuarios, ver y gestionar todos los datos, 
                actualizar contenidos y asegurarte de que todo funcione correctamente. < br />
                ¡Bienvenido al control total de <span id="nat">Nat</span><span id="user">User</span>!</p>
                
                <a href="http://localhost:5173/admin/cursos" className="btn btn-outline-primary m-3">Cursos</a>
                <a href="http://localhost:5173/admin/medicos" className="btn btn-outline-primary m-3">Médicos</a>
                <a href="http://localhost:5173/admin/consultas" className="btn btn-outline-primary m-3">Consultas</a>
                <a href="http://localhost:5173/admin/usuarios" className="btn btn-outline-primary m-3">Usuarios</a>
            </div>
        
        </div>
        </div>
    )
}

export default Admin;