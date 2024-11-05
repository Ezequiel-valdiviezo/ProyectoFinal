import React, { useState, useEffect } from "react";
import '../styles/anotador.css'
import CalculadorDias from '../components/CalculadorDias'
import { useColorContext } from '../context/colorContext';
import { useNavigate } from "react-router-dom";

function Anotador(){

    const [lista, setLista] = useState([]);
    const [hechas, setHechas] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [notaEliminada, setNotaEliminada] = useState('');
    const [notaCreada, setNotaCreada] = useState('');
    const [notaTerminada, setNotaTerminada] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      user_id: '',
      nota: '',
      estado: 'activo',
    });
    const { colors, color } = useColorContext();
    const estiloTitulo = {
        color: color,
      };

      useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('user'));
        if (!usuario) {
            navigate('/login');
        } else if (usuario.user.role === "admin") {
            navigate('/panel/admin');
        } else if (usuario.user.role === "user") {
            console.log("Todo bien");
        }
    }, [navigate]);

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
        setNotaCreada("Nota creada exitosamente");
        // Establecer un temporizador para vaciar el mensaje después de 5 segundos y recargar la página
        setTimeout(() => {
          setNotaCreada(""); // Vacía el mensaje
          // window.location.reload();
        }, 3000); // 5000 milisegundos = 5 segundos
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
              // window.location.reload(); 
              console.log('Nota marcada como terminada exitosamentee');
              setNotaTerminada("Marcando nota como terminada...");

              // Establecer un temporizador para vaciar el mensaje después de 5 segundos y recargar la página
              setTimeout(() => {
                setNotaTerminada(""); // Vacía el mensaje
                window.location.reload();
              }, 3000); // 5000 milisegundos = 5 segundos
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
          // window.location.reload();
          console.log('Nota eliminada exitosamentee');
          setNotaEliminada("Eliminando nota...");
          // Establecer un temporizador para vaciar el mensaje después de 5 segundos y recargar la página
        setTimeout(() => {
          setNotaEliminada(""); // Vacía el mensaje
          window.location.reload();
        }, 3000); // 5000 milisegundos = 5 segundos
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
          <h2 className="text-center" style={estiloTitulo}>Anotador y contador de días</h2>
          <p className="text-center limite-lineas m-auto">Desde acá vas a poder tener notas para lo que necesites, podés utilizarlo para fechas importantes, lista de compras o lo que necesites.
            <br />
            Además, con el contador de días, podés calcular cuantos días faltan para una fecha específica, ya sea para algún turno médico, entrega, etc.</p>
        </div>

  <div className="row anchoTodo">
    {/* <div className="col-md-6 mt-4">
      <div className="anchoAnotador">
          <div className="m-auto" style={{ maxWidth: '900px', width: '100%' }}>
            <h3 className="text-center" style={estiloTitulo}>Lista</h3>
            {notaCreada && 
              // <p className="text-center">{notaCreada}</p>
              <div className="alert alert-success d-flex align-items-center mt-5" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="0" height="24" role="img" aria-label="success:">
                        <use xlinkHref="#exclamation-triangle-fill" />
                    </svg>
                    <div>
                    {notaCreada}
                    </div>
                </div>
            }
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
                
                <div className="my-2 agregarNota">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="nota" className="form-label" style={estiloTitulo}>Nota</label>
                      <input type="text" className="form-control" id="nota" name="nota" value={formData.nota} onChange={handleInputChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary mx-1">Enviar</button>
                    <button type="submit" onClick={cerrarFormNotas} className="btn btn-primary mx-1">Cancelar</button>
                  </form>
                </div>

              )}

            </div>
          </div>
      </div>
    </div> */}
    {/* <div className="col-md-6 mt-4 notasHechas">
      <div className="anchoAnotador">
          <div className="m-auto" style={{ maxWidth: '900px', width: '100%' }}>
            <h3 className="text-center" style={estiloTitulo}>Terminadas</h3>
            {notaTerminada && 
              // <p className="text-center">{notaTerminada}</p>
              <div className="alert alert-success d-flex align-items-center mt-5" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="0" height="24" role="img" aria-label="success:">
                        <use xlinkHref="#exclamation-triangle-fill" />
                    </svg>
                    <div>
                    {notaTerminada}
                    </div>
                </div>
            }
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
            {notaEliminada && 
              // <p className="text-center">{notaEliminada}</p>

              <div className="alert alert-success d-flex align-items-center mt-5" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="0" height="24" role="img" aria-label="success:">
                        <use xlinkHref="#exclamation-triangle-fill" />
                    </svg>
                    <div>
                    {notaEliminada}
                    </div>
                </div>
            }
          </div>
      </div>
    </div> */}




    <div className=" mt-4">
      <div className="anchoAnotador">
          <div className="m-auto" 
          // style={{ maxWidth: '900px', width: '100%' }}
          >
            <h3 className="text-center" style={estiloTitulo}>Lista</h3>
            {notaCreada && 
              // <p className="text-center">{notaCreada}</p>
              <div className="alert alert-success d-flex align-items-center mt-5" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="0" height="24" role="img" aria-label="success:">
                        <use xlinkHref="#exclamation-triangle-fill" />
                    </svg>
                    <div>
                    {notaCreada}
                    </div>
                </div>
            }
            <ul className="list-group mb-3">
              {lista.map((notas, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
          
                  <span style={{ color: 'red', fontWeight: 'bold' }}>
                  {notas.estado}
                  </span>

                 <span>
                  {notas.nota}
                 </span>
                  <div>
                      <button onClick={() => handleSubmitTerminado(notas.id)}  className="me-2 btn btn-primary">Terminado</button>
                  </div>
                </li>
              ))}
              {hechas.map((notas, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
          
                  <span style={{ color: 'green', fontWeight: 'bold' }}>
                  {notas.estado}
                  </span>

        

                 <span>
                  {notas.nota}
                 </span>
                  <div>
                    <button onClick={() => eliminarNota(notas.id)}  className="me-2 btn btn-danger">Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>




            <div className="text-center">
              <button onClick={abrirFormNotas} className="btn btn-outline-primary">Agregar Nota</button>

              {showForm && (
                
                <div className="my-2 agregarNota">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="nota" className="form-label" style={estiloTitulo}>Nota</label>
                      <input type="text" className="form-control" id="nota" name="nota" value={formData.nota} onChange={handleInputChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary mx-1">Enviar</button>
                    <button type="submit" onClick={cerrarFormNotas} className="btn btn-primary mx-1">Cancelar</button>
                  </form>
                </div>

              )}

            </div>
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
