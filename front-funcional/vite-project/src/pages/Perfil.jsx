import React from "react";
import '../styles/perfil.css'
import img from '../assets/2.png'


function Perfil(){

    return(
        <div className="perfil mt-5 p-5">
            <div className="row">
                <div className="col-12">
                <h2 className="mb-4 text-center">Mi Perfil</h2>
                </div>
            </div>
            <div className="row align-items-center m-auto">
                <div className="col-md-4 text-center">
                <img 
                    src={img} 
                    alt="Foto de perfil" 
                    className="imagenPerfil" 
                    width="100%"
                />
                <button className="mt-2 btn btn-outline-light">Camabiar</button>
                </div>
                <div className="col-md-8">
                <h3>Ezequiel</h3>
                <p>Ezequiel@gmail.com</p>
                </div>
            </div>
        </div>
    )
}

export default Perfil;