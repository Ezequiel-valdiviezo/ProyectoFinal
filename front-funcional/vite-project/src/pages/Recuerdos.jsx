import React, { useEffect, useState } from "react";

function Recuerdos(){

    const [recuerdos, setRecuerdos] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/album', {
            method: 'GET',
            credentials: 'include'
        }
        )
            .then(response => response.json())
            .then(data => setRecuerdos(data))
            .catch(error => console.error('Error fetching recuerdos:', error));
    }, []);

    const handleDelete = async (id) => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/album/${id}`, {
            method: 'DELETE',
            credentials: 'include'
          });
    
          if (response.ok) {
            // Actualizar el estado eliminando el recuerdo borrado
            setRecuerdos(recuerdos.filter(recuerdo => recuerdo.id !== id));
          } else {
            console.error('Error al eliminar el recuerdo');
          }
        } catch (error) {
          console.error('Error en la solicitud de eliminación:', error);
        }
      };

    return(
        <>
            <h2>Álbum de recurdos</h2>
            <p>Desde aquí vas poder cargar, eliminar y ver los recuerdos más significativos para vos.</p>

            <button className="btn btn-primary">Cargar recuerdo</button>

            <ul>
            {recuerdos.map((recuerdo) => (
                <li key={recuerdo.id}>
                {recuerdo.descripcion}
                <button onClick={() => handleDelete(recuerdo.id)}>Eliminar</button>
                </li>
            ))}
            </ul>

        </>
    )
}

export default Recuerdos;