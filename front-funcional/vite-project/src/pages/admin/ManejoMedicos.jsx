import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useColorContext } from '../../context/colorContext';
import '../../styles/adminManejoMedicos.css'
import gif from '../../assets/gif/check.gif'

function ManejoMedicos(){
    const [medicos, setMedicos] = useState([]);
    const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);

    const [medicosVencidos, setMedicosVencidos] = useState([]);

    const [estadoForm, setEstadoForm] = useState(false);
    const [msjCreado, setMsjCreado] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { colors, color } = useColorContext();
    const estiloTitulo = {
        color: color,
      };

    const fechaActual = new Date();

      useEffect(() => {
        fetch('http://127.0.0.1:8000/api/medicos', {
            method: 'GET',
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => {
          setMedicos(data);
          const vencidos = data.filter(medico => new Date(medico.fecha_vencimiento) <= fechaActual);
          setMedicosVencidos(vencidos);
      })
        .catch(error => console.error('Error fetch médicos:', error));
    }, []);

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('user'));
        if (!usuario) {
            navigate('/login');
        } else if (usuario.user.role === "admin") {
            console.log("Todo bien");
        } else if (usuario.user.role === "user") {
            navigate('/home');
        }
    }, [navigate]);

    const [formData, setFormData] = useState({
        nombre: "",
        imagen: "",
        descripcion: "",
        especialidad: "",
        email: "",
        precio: "",
        telefono: ""
      });

      const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'imagen') {
          setFormData({
            ...formData,
            imagen: files[0]
          });
        } else {
          setFormData({
            ...formData,
            [name]: value
          });
        }
      };

      const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/medicos/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if(response.ok){
                console.log("Medico eliminado correctamente");
                setMedicos(medicos.filter(medico => medico.id !== id));
            }else {
                console.error("Error al eliminar el médico")
            }
        } catch (error) {
            console.log("Error en la solicitus de eliminació", error);
        }
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const formDataToSend = new FormData();
        formDataToSend.append('nombre', formData.nombre);
        formDataToSend.append('imagen', formData.imagen); // Añade la imagen al FormData
        formDataToSend.append('descripcion', formData.descripcion);
        formDataToSend.append('especialidad', formData.especialidad);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('precio', formData.precio);
        formDataToSend.append('telefono', formData.telefono);
        formDataToSend.append('fecha_vencimiento', formData.fecha_vencimiento);
    
        try {
          const response = await fetch('http://127.0.0.1:8000/api/medicos', { 
            method: 'POST',
            credentials: 'include',
            body: formDataToSend
          });
          setMsjCreado('Creando...')
          if (!response.ok) {
            const errorData = await response.json();
            console.log('Error data:', errorData);
            setError(errorData);
            setMsjCreado('Error al crear médico')
            return;
          }

          if (response.ok) {
            const data = await response.json();
            setMedicos([...medicos, data])
            setMsjCreado(`<div class="mt-3 d-flex justify-content-center justify-content-center">
                  <div>
                    <img src="${gif}" width="28px" alt="">
                  </div>
                  <div>
                    <p class="mx-2">Médico creado exitosamente</p>
                  </div>
                </div> `);
                // setTimeout(() => {
                //     setMsjCreado('');
                // }, 3000); 
            console.log('Médico creado exitosamente:', data);
          } else {
            console.error('Error al crear el Médico');
          }
        } catch (error) {
          console.error('Error en la solicitud de creación:', error);
          setMsjCreado('Error al crear médico')
        }
      };

      const handleAbrirForm = () => {
        setEstadoForm(true);
      };
    
      const handleCerrarForm = () => {
        setEstadoForm(false);
      };

      const handleMostrarDetalles = (index) => {
        setMedicoSeleccionado(medicos[index]);
    };

    const handleCerrarDetalles = () => {
        setMedicoSeleccionado(null);
    };

    return(
        <>
            <div className="vh-100">
            <div className="adminManejoMedicos pt-5 pb-5 text-center">

            {Array.isArray(medicosVencidos) && medicosVencidos.length > 0 ? (
                //  <div className="alert alert-danger mt-5" role="alert">
                //  Algunos servicios pasaron su fecha de vencimiento
                //   </div>
                <div className="alert alert-danger d-flex align-items-center mt-5" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                        <use xlinkHref="#exclamation-triangle-fill" />
                    </svg>
                    <div>
                        Algunos servicios pasaron su fecha de vencimiento
                    </div>
                </div>
                  
                ) : (
                  <div></div>
                )}

            <h2 style={estiloTitulo}>Manejo Médicos</h2>

            <button className="btn btn-outline-primary mb-4" onClick={handleAbrirForm}>Crear médico</button>


                    {estadoForm &&
                    <form className="curso-form p-5" onSubmit={handleSubmit}>
                        {/* <h3>Crear curso</h3> */}
                        <div className="form-group my-4">
                            <label htmlFor="nombre">Nombre:</label>
                            <input className="p-1" type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                            {error.nombre && <p style={{ color: 'red' }}>{error.nombre[0]}</p>}
                        </div>
                        <div className="form-group my-4">
                        <label htmlFor="imagen">Imagen</label>
                        <input
                            type="file"
                            className="form-control mt-2"
                            id="imagen"
                            name="imagen"
                            accept="image/*"
                            onChange={handleChange}
                        />
                        {error.imagen && <p style={{ color: 'red' }}>{error.imagen[0]}</p>}
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="descripcion">Descripción:</label>
                            <textarea name="descripcion" id="descripcion" value={formData.descripcion} onChange={handleChange} />
                            {error.descripcion && <p style={{ color: 'red' }}>{error.descripcion[0]}</p>}
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="especialidad">Especialidad:</label>
                            <input className="p-1" type="text" id="especialidad" name="especialidad" value={formData.especialidad} onChange={handleChange} />
                            {error.especialidad && <p style={{ color: 'red' }}>{error.especialidad[0]}</p>}
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="email">Email:</label>
                            <input className="p-1" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                            {error.email && <p style={{ color: 'red' }}>{error.email[0]}</p>}
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="precio">Precio:</label>
                            <input className="p-1" type="text" id="precio" name="precio" value={formData.precio} onChange={handleChange} />
                            {error.precio && <p style={{ color: 'red' }}>{error.precio[0]}</p>}
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="telefono">Teléfono de contacto:</label>
                            <input className="p-1" type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
                            {error.telefono && <p style={{ color: 'red' }}>{error.telefono[0]}</p>}
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="fecha_vencimiento">Fecha de vencimiento:</label>
                            <input className="p-1" type="date" id="fecha_vencimiento" name="fecha_vencimiento" value={formData.fecha_vencimiento} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-outline-primary m-2">Crear médico</button>
                        <button type="button" className="btn btn-primary m-2" onClick={handleCerrarForm}>Cancelar</button>
                        </form>
                    }

<p className="mt-4" dangerouslySetInnerHTML={{ __html: msjCreado }}></p>


            {Array.isArray(medicos) && medicos.length > 0 ? (
                    <table className="table mt-5 table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Especialidad</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col">Precio</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicos.map((medico, index) => (
                                <tr key={index}>
                                    <td>{medico.nombre}</td>
                                    <td>{medico.especialidad}</td>
                                    <td>{medico.telefono}</td>
                                    <td>${medico.precio}</td>
                                    <td>
                                    <button className="btn btn-outline-primary m-1" onClick={() => handleMostrarDetalles(index)}>Detalles</button>
                                    <button onClick={() => handleDelete(medico.id)} className="btn btn-outline-danger m-1">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No se encontraron médicos.</p>
                )}

                {medicoSeleccionado && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="modal-close" onClick={handleCerrarDetalles}>&times;</span>
                            <img src={'http://127.0.0.1:8000/' + medicoSeleccionado.imagen} width="100%" className="card-img-top" alt="" />
                            <h3 className="my-2">Detalles del médico</h3>
                            <p className="text-start"><span className="fw-bold">Nombre:</span> {medicoSeleccionado.nombre}</p>
                            <p className="text-start"><span className="fw-bold">Descripción:</span> {medicoSeleccionado.descripcion}</p>
                            <p className="text-start"><span className="fw-bold">Categoría:</span> {medicoSeleccionado.especialidad}</p>
                            <p className="text-start"><span className="fw-bold">Teléfono:</span> {medicoSeleccionado.telefono}</p>
                            <p className="text-start"><span className="fw-bold">Precio</span>: ${medicoSeleccionado.precio}</p>
                            <p className="text-start"><span className="fw-bold">Fecha de vencimiento</span>: {medicoSeleccionado.fecha_vencimiento}</p>
                            <button className="btn btn-outline-primary" onClick={handleCerrarDetalles}>Cerrar</button>
                        </div>
                    </div>
                )}

<h2 className="mt-5" style={estiloTitulo}>Servicios vencidos</h2>

{Array.isArray(medicosVencidos) && medicosVencidos.length > 0 ? (
                    <table className="table mt-5 table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Especialidad</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col">Precio</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicosVencidos.map((medico, index) => (
                                <tr key={index}>
                                    <td>{medico.nombre}</td>
                                    <td>{medico.especialidad}</td>
                                    <td>{medico.telefono}</td>
                                    <td>${medico.precio}</td>
                                    <td>
                                    <button className="btn btn-outline-primary m-1" onClick={() => handleMostrarDetalles(index)}>Detalles</button>
                                    <button onClick={() => handleDelete(medico.id)} className="btn btn-outline-danger m-1">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="mt-5">No se encontraron servicios vencidos.</p>
                )}


            </div>
            </div>
        </>
    )
}

export default ManejoMedicos;