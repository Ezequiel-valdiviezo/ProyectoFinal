import React, {useEffect, useState} from "react";
import '../styles/dashboard.css'

function Dashboard(){


    return(
        <div className="dashboard">
        <h1>Bienvenido a la sección para usuarios de NatUser</h1>
        <p>Hola [Jaimito]</p>
        <p>Nos alegra tenerte por aquí. Esperamos que encuentres útil las herramientas que ofrecemos.</p>
        
        <h2>Funcionalidades para Usuarios</h2>
        <p>Además, como usuario registrado, tienes acceso a una variedad de herramientas diseñadas para facilitarte la vida como padre primerizo:</p>
        <ul>
            <li>Seguimiento del crecimiento y desarrollo de tu bebé</li>
            <li>Recordatorios de vacunación</li>
            <li>Foros de discusión y comunidades de padres</li>
            <li>Acceso a expertos en pediatría y psicología infantil</li>
        </ul>
        <p>Gracias por ser parte de nuestra comunidad. ¡Estamos aquí para apoyarte en cada paso del camino!</p>
    

        </div>
    )
}

export default Dashboard;