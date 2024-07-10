import React from "react";
import '../styles/medicos.css'
import { useColorContext } from '../context/colorContext';

function Medicos(){
    const { colors, color } = useColorContext();
    const estiloTitulo = {
        color: color,
      };

    return(
        <div className="fondoMedicos">
            <div className="medicos text-center">
                <h2 className="pt-5" style={estiloTitulo}>Médicos</h2>
            </div>
        </div>
    )
}

export default Medicos;