import React, { useState } from 'react';
import '../styles/calculadorDias.css';

const CalculadoraDias = () => {
  const [fechaObjetiva, setFechaObjetiva] = useState('');
  const [diasRestantes, setDiasRestantes] = useState(null);

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
    <div className="contadorDias">
      <h1>Contador de Días</h1>
      <div className='contenedor'>
        <label>Ingresa una fecha:</label>
        <input
            type="date"
            id="fechaObjetiva"
            value={fechaObjetiva}
            onChange={(e) => setFechaObjetiva(e.target.value)}
        />
        <button onClick={verificaFecha}>Calcular</button>
        {diasRestantes !== null && (
            <p>Faltan {diasRestantes} días hasta la fecha.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default CalculadoraDias;
