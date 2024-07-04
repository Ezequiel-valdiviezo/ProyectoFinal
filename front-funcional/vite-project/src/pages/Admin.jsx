import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        <>
        <h2>Hola soy admin</h2>
        </>
    )
}

export default Admin;