import React, { useState } from 'react';
import '../styles/calculadorDias.css';
import { useColorContext } from '../context/colorContext';

const CalculadoraDias = () => {
  const [fechaObjetiva, setFechaObjetiva] = useState('');
  const [diasRestantes, setDiasRestantes] = useState(null);
  const { colors, color } = useColorContext();
  const estiloTitulo = {
      color: color,
    };

  const verificaFecha = () => {
    if (!fechaObjetiva) {
      alert('Por favor ingresa una fecha objetivo.');
      return;
    }

    //Crea un objeto date con la fecha objetiva
    //getTime() convierte esta fecha en milisegundos
    const tiempoObjetivo = new Date(fechaObjetiva).getTime();
    //Crea un objeto date con la fecha actual
    const tiempoActual = new Date().getTime();

    //Calcula la diferencia en milisegundos entre la fecha objetiva y la actual
    const diferenciaTiempo = tiempoObjetivo - tiempoActual;
    // Convierte los milisengudos, en un día completo
    //Math.ceil redondea el resultado al número entero superior más próximo
    const dias = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));

    setDiasRestantes(dias);
  };

  return (
    <>
    <div className="contadorDias py-4 mt-5">
      <div className='contenedor'>
        <label className='my-2' style={estiloTitulo}>Ingresá una fecha:</label>
        <input
            className='p-1'
            type="date"
            id="fechaObjetiva"
            value={fechaObjetiva}
            onChange={(e) => setFechaObjetiva(e.target.value)}
        />
        <button className='btn btn-outline-primary m-auto mt-3 mb-2' onClick={verificaFecha}>Calcular</button>
        {diasRestantes !== null && (
            <p>Faltan {diasRestantes} días hasta la fecha.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default CalculadoraDias;
