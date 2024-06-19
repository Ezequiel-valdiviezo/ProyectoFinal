import React, { useState, useEffect } from "react";
import '../styles/anotador.css'
import CalculadorDias from '../components/CalculadorDias'

function Anotador(){

    const [lista, setLista] = useState([]);
    const [hechas, setHechas] = useState([]);

    useEffect(() => {
        // Cargar datos desde localStorage al iniciar
        const localLista = JSON.parse(localStorage.getItem('lista')) || [];
        const localHechas = JSON.parse(localStorage.getItem('hechas')) || [];
        setLista(localLista);
        setHechas(localHechas);
    }, []);

    useEffect(() => {
        // Guardar datos en localStorage cada vez que lista o hechas cambien
        localStorage.setItem('lista', JSON.stringify(lista));
        localStorage.setItem('hechas', JSON.stringify(hechas));
    }, [lista, hechas]);

    const agregarNota = () => {
        const nota = prompt("Ingrese la nota:");
        if (nota) {
            setLista([...lista, nota]);
        }
    };

    const marcarComoHecha = (index) => {
        const nota = lista[index];
        const nuevaLista = lista.filter((_, i) => i !== index);
        setLista(nuevaLista);
        setHechas([...hechas, nota]);
    };

    const eliminarNota = (index, esHecha) => {
        if (esHecha) {
            const nuevaHechas = hechas.filter((_, i) => i !== index);
            setHechas(nuevaHechas);
        } else {
            const nuevaLista = lista.filter((_, i) => i !== index);
            setLista(nuevaLista);
        }
    };

    return (
      <div className="anotador mb-5">
        <div className="presentacion mt-5 p-4">
          <h2 className="text-center">Bienvenido al anotador y contador de días</h2>
          <p className="text-center">Desde acá vas a poder tener notas para lo que necesites, podés utilizarlo como lista de compras, de comidas, o lo que necesites.</p>
        </div>

      <div className="contenedorLista py-4 px-5 my-4">
        <div className="m-auto" style={{ maxWidth: '900px', width: '100%' }}>
          <h3 className="text-center">Lista</h3>
          <ul className="list-group mb-3">
            {lista.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {item}
                <div>
                  <button onClick={() => marcarComoHecha(index)} className="me-2 btn btn-primary">Terminado</button>
                  <button onClick={() => eliminarNota(index, false)} className="btn btn-danger">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-center">
            <button onClick={agregarNota} className="btn btn btn-outline-light">Agregar Nota</button>
          </div>
        </div>

        <div className="m-auto" style={{ maxWidth: '900px', width: '100%' }}>
          <h3 className="text-center mt-5">Hechas</h3>
          <ul className="list-group mb-3">
            {hechas.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {item}
                <div>
                  <button onClick={() => eliminarNota(index, true)} className="btn btn-danger">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

        <CalculadorDias />
      </div>
    );
}

export default Anotador;
