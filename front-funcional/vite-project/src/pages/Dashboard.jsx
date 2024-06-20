import React, {useEffect, useState} from "react";
import '../styles/dashboard.css'
import icono1 from '../assets/icono1.png'
import icono2 from '../assets/icono2.png'
import icono3 from '../assets/icono3.png'
import icono4 from '../assets/icono4.png'
import saludo from '../assets/ez.png'

function Dashboard(){


    return(
        <div className="dashboard pt-3">
        {/* <h2 className="mb-5">Dashboard</h2> */}

        <div className="saludo p-4 mt-5 d-flex align-items-center">
            <div>
                <img src={saludo} width="" alt="" />
            </div>
            <div>
                <h3>Bienvenido/a Ezequiel</h3>
                <p>¡Nos alegra tenerte por aquí!</p>
            </div>
        </div>

        <div className="funcionalidades p-4 mt-2">
            <h2>Funcionalidades para Usuarios</h2>
            <p>Además, como usuario registrado, tienes acceso a una variedad de herramientas diseñadas para facilitarte la vida como padre primerizo:</p>
        
            <div className="d-flex flex-wrap justify-content-center">
                <div className="col-md-3 funcMini m-auto p-3">
                    <img src={icono1} width="50px" alt="" />
                    <p>Seguimiento del crecimiento y desarrollo de tu bebé</p>
                </div>
                <div className="col-md-3 funcMini m-auto p-3">
                    <img src={icono2} width="50px" alt="" />
                    <p>Recordatorios de vacunación</p>
                </div>
                <div className="col-md-3 funcMini m-auto p-3">
                    <img src={icono3} width="50px" alt="" />
                    <p>Foros de discusión y comunidades de padres</p>
                </div>
                <div className="col-md-3 funcMini m-auto p-3">
                    <img src={icono4} width="50px" alt="" />
                    <p>Acceso a expertos en pediatría y psicología infantil</p>
                </div>
            </div>
        </div>
        
        <div className="agradecimiento mt-2">
            <p className="p-3">Gracias por ser parte de nuestra comunidad. ¡Estamos aquí para apoyarte en cada paso del camino!</p>
        </div>
        

        </div>
    )
}

export default Dashboard;