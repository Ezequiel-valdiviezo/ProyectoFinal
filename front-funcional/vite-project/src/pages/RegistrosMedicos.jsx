import React from "react";
import '../styles/registrosMedicos.css'

function RegistrosMedicos(){

    return(
        <>
        <div className="registrosMedicos">

            <h2 className="pt-5">Registros médicos</h2>
            <p>Desde acá vas a poder cargar, eliminar y ver los registros médicos.</p>
            <button className="btn btn-outline-primary" >Cargar registro médico</button>
        </div>
        </>
    )
}

export default RegistrosMedicos;