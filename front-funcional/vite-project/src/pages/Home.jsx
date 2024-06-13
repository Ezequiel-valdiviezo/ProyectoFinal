import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import CalculadoraDias from "../components/CalculadorDias";
import Dashboard from "./Dashboard";

function Home(){

    const [cursos, setCursos] = useState([]);
    const [mostrarCursos, setMostrarCursos] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/cursos', {
            method: 'GET',
            credentials: 'include'
        }
        )
            .then(response => response.json())
            .then(data => setCursos(data))
            .catch(error => console.error('Error fetching cursos:', error));
    }, []);

    const handleMostrarCursos = () => {
        setMostrarCursos(true);
    };

    const handleOcultarCursos = () => {
        setMostrarCursos(false);
    };

    return(
        <>
        <Header />
        <Dashboard />

        </>
    )
}

export default Home;