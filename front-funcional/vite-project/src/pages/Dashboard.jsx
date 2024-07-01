import React, {useEffect, useState} from "react";
import '../styles/dashboard.css'
import icono1 from '../assets/icono1.png'
import icono2 from '../assets/icono2.png'
import icono3 from '../assets/icono3.png'
import icono4 from '../assets/icono4.png'
import saludo from '../assets/ez.png'
import img from '../assets/logo.png'


function Dashboard(){


    return(
        <div className="fondoDashboard vh-100">
        <div className="dashboard pt-5 text-center">
            <div className="saludo">
            {/* <img src={img} width="100px" alt="" /> */}
            <h2>¡Bienvenido a <span id="nat">Nat</span><span id="user">User</span>!</h2>
            <p>¡Nos alegra tenerte por acá!</p>
            </div>

            <div className="funcionalidades p-4 mt-2">
            <h2>Funcionalidades para Usuarios</h2>
            <p>Como usuario registrado, tenes acceso a una variedad de herramientas diseñadas para facilitarte la vida como padre primerizo:</p>
        
            <div className="d-flex flex-wrap justify-content-center align-items-center mt-4">
                <div className="col-md-3 funcMini pt-2">
                    <img src={icono1} width="50px" alt="" />
                    <p>Acceso a expertos en pediatría</p>
                </div>
                <div className="col-md-3 funcMini pt-2">
                    <img src={icono2} width="50px" alt="" />
                    <p>Anotador y cursos</p>
                </div>
                <div className="col-md-3 funcMini pt-2">
                    <img src={icono3} width="50px" alt="" />
                    <p>Albúm de recuerdos</p>
                </div>
                <div className="col-md-3 funcMini pt-2">
                    <img src={icono4} width="50px" alt="" />
                    <p>Foros de padres</p>
                </div>
            </div>
            </div>

            <div className="agradecimiento mt-2">
                 <p className="p-3">Gracias por ser parte de nuestra comunidad. ¡Estamos acá para apoyarte en cada paso del camino!</p>
             </div>
        </div>
        </div>
    )
}

export default Dashboard;