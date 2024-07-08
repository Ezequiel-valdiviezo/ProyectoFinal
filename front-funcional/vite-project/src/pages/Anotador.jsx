import React, { useState, useEffect } from "react";
import '../styles/anotador.css'
import CalculadorDias from '../components/CalculadorDias'

function Anotador(){

    const [lista, setLista] = useState([]);
    const [hechas, setHechas] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
      user_id: '',
      nota: '',
      estado: 'activo',
    });

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      const id = user.user.id;
  
      fetch(`http://127.0.0.1:8000/api/anotador/${id}`, {
        method: 'GET',
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLista(data);
        } else {
          console.error('Unexpected API response:', data);
        }
      })
      .catch(error => console.error('Error fetching recuerdos:', error));
    }, []);

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      const id = user.user.id;
  
      fetch(`http://127.0.0.1:8000/api/anotador/listo/${id}`, {
        method: 'GET',
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setHechas(data);
        } else {
          console.error('Unexpected API response:', data);
        }
      })
      .catch(error => console.error('Error fetching recuerdos:', error));
    }, []);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value,
      });
    };

    const abrirFormNotas = () => {
      setShowForm(true);
    };
    const cerrarFormNotas = () => {
      setShowForm(false);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    const formDataToSend = new FormData();
    formDataToSend.append('user_id', user.user.id);
    formDataToSend.append('nota', formData.nota);
    formDataToSend.append('estado', formData.estado);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/anotador', {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend
      });

      if (response.ok) {
        const data = await response.json();
        setLista([...lista, data.nota]);
        setShowForm(false);
        setFormData({
          user_id: '',
          nota: '',
          estado: 'activo',
        });
        console.log('Nota guardado exitosamente');
      } else {
        console.error('Error al guardar la Nota');
      }
    } catch (error) {
      console.error('Error en la solicitud de guardado:', error);
    }
    }

    const handleSubmitTerminado = async (id) => {
      // e.preventDefault;

      const formDataToSend = new FormData();
      // formDataToSend.append('user_id', user.user.id);
      // formDataToSend.append('nota', nota);
      formDataToSend.append('estado', 'terminado');

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/anotador/listo/${id}`, {
          method: 'PUT',
          credentials: 'include',
          // body: formDataToSend
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ estado: 'terminado' })
        });
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
              // setLista(lista.filter(nota => nota.id !== id));
              // setHechas([...hechas, data.nota]);
              window.location.reload(); // Recargar la página
              console.log('Nota marcada como terminada exitosamentee');
        } else {
          console.error('Error al guardar la nota como terminada');
        }
      } catch (error) {
        console.error('Error en la solicitud de guardado:', error);
      }

    }

    const eliminarNota = async(id) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/anotador/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (response.ok) {
          window.location.reload(); // Recargar la página
          console.log('Nota eliminada exitosamentee');
        } else {
          console.error('Error al eliminar la nota');
        }
      } catch (error) {
        console.error('Error en la solicitud de eliminar:', error);
      }
    }



    return (
      <div className="fondoAnotador">
      <div className="anotador pb-5">
        <div className="presentacion pt-5 p-4">
          <h2 className="text-center">Anotador y contador de días</h2>
          <p className="text-center limite-lineas m-auto">Desde acá vas a poder tener notas para lo que necesites, podés utilizarlo como lista de compras, de comidas, o lo que necesites.
            <br />
            Además, con el contador de días, podés calcular cuantos días faltan para una fecha específica, ya sea para algún turno médico, entrega, etc.</p>
        </div>

  <div className="row anchoTodo">
    <div className="col-md-6 mt-4">
      <div className="anchoAnotador">
          <div className="m-auto" style={{ maxWidth: '900px', width: '100%' }}>
            <h3 className="text-center">Lista</h3>
            <ul className="list-group mb-3">
              {lista.map((notas, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {notas.nota}
                  <div>
                      <button onClick={() => handleSubmitTerminado(notas.id)}  className="me-2 btn btn-primary">Terminado</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <button onClick={abrirFormNotas} className="btn btn-outline-primary">Agregar Nota</button>

              {showForm && (
                
                <div className="">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="nota" className="form-label">Nota</label>
                      <input type="text" className="form-control" id="nota" name="nota" value={formData.nota} onChange={handleInputChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar</button>
                  </form>
                    <button type="submit" onClick={cerrarFormNotas} className="btn btn-primary">Cancelar</button>
                </div>

              )}

            </div>
          </div>
      </div>
    </div>
    <div className="col-md-6 mt-4 notasHechas">
      <div className="anchoAnotador">
          <div className="m-auto" style={{ maxWidth: '900px', width: '100%' }}>
            <h3 className="text-center">Hechas</h3>
            {hechas.length > 0 ? (
              <ul className="list-group mb-3">
                {hechas.map((nota, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {nota.nota}
                    <div>
                      <button onClick={() => eliminarNota(nota.id)}  className="me-2 btn btn-danger">Eliminar</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">No hay notas terminadas.</p>
            )}
          </div>
      </div>
    </div>
  </div>
  <div className="row mt-4">
    <div className="col-md-12">
      <div className="contador">
        <CalculadorDias />
      </div>
    </div>
  </div>
</div>


      </div>


    );
}

export default Anotador;
