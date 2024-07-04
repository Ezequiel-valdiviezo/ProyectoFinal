import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Medicos(){
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
        <>
        <h2>Hola soy Medicos</h2>
        </>
    )
}

export default Medicos;