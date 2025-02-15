import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useColorContext } from '../../context/colorContext';
import '../../styles/adminManejoMedicos.css'
import gif from '../../assets/gif/check.gif'

function ManejoMedicos(){
    const [medicos, setMedicos] = useState([]);
    const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
    const [loading, setLoading] = useState(false)

    const [medicosVencidos, setMedicosVencidos] = useState([]);

    const [estadoForm, setEstadoForm] = useState(false);
    const [msjCreado, setMsjCreado] = useState('');
    const [msjEliminar, setMensajeEliminar] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { colors, color } = useColorContext();
    const estiloTitulo = {
        color: color,
      };

    const fechaActual = new Date();

      // FETCH DE GET PARA TRAER MEDICOS
      useEffect(() => {
        setLoading(true)
        fetch('http://127.0.0.1:8000/api/medicos', {
            method: 'GET',
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => {
          setMedicos(data);
          const vencidos = data.filter(medico => new Date(medico.fecha_vencimiento) <= fechaActual);
          setMedicosVencidos(vencidos);
          setLoading(false);
      })
        .catch(error => {console.error('Error fetch médicos:', error); setLoading(false)});
    }, []);

    // MANEJO DE ROLES DE USUARIO
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

      // FETCH Y MANEJO PARA BORRAR MEDICO
      const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/medicos/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            setMensajeEliminar(` <div className="alert alert-success d-flex align-items-center mt-5 mx-5" role="alert">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Cargando...</span>
                </div>
                <div>
                 <p>Eliminando...</p>
                </div>
            </div>`);
            if(response.ok){
                console.log("Medico eliminado correctamente");
                setMedicos(medicos.filter(medico => medico.id !== id));
                setMensajeEliminar(`<div class="mt-3 d-flex justify-content-center justify-content-center">
                    <div>
                      <img src="${gif}" width="28px" alt="">
                    </div>
                    <div>
                      <p class="mx-2">Médico eliminado correctamente</p>
                    </div>
                  </div> `);
            }else {
                console.error("Error al eliminar el médico")
                setMensajeEliminar(`<div class="mt-3 d-flex justify-content-center justify-content-center">
                    <div>
                      <img src="${gif}" width="28px" alt="">
                    </div>
                    <div>
                      <p class="mx-2">Error al eliminar médico</p>
                    </div>
                  </div> `);
            }
        } catch (error) {
            console.log("Error en la solicitus de eliminació", error);
            setMensajeEliminar(`<div class="mt-3 d-flex justify-content-center justify-content-center">
                <div>
                  <img src="${gif}" width="28px" alt="">
                </div>
                <div>
                  <p class="mx-2">Error al eliminar médico</p>
                </div>
              </div> `);
        }
      }

      // FETCH Y MANEJO PARA CREAR MEDICO
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

      // DataTables
      useEffect(() => {
        const $ = window.jQuery;
        if (medicos.length > 0) {
          $(document).ready(function () {
            $("#usuariosTable").DataTable({
                language: {
                  processing: "Procesando...",
                  search: "Buscar:",
                  lengthMenu: "Mostrar _MENU_ registros",
                  info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                  infoEmpty: "Mostrando 0 a 0 de 0 registros",
                  infoFiltered: "(filtrado de _MAX_ registros totales)",
                  infoPostFix: "",
                  loadingRecords: "Cargando...",
                  zeroRecords: "No se encontraron registros coincidentes",
                  emptyTable: "No hay datos disponibles en la tabla",
                  paginate: {
                    first: "Primero",
                    previous: "Anterior",
                    next: "Siguiente",
                    last: "Último",
                  },
                  aria: {
                    sortAscending: ": activar para ordenar la columna de manera ascendente",
                    sortDescending: ": activar para ordenar la columna de manera descendente",
                  },
                },
              });
          });
    
          // Cleanup: Destruir DataTables para evitar duplicados
          return () => {
            if ($.fn.DataTable.isDataTable("#usuariosTable")) {
              $("#usuariosTable").DataTable().destroy();
            }
          };
        }
      }, [medicos]);

      const [medicoEditar, setMedicoEditar] = useState(null);
      const [nuevaFecha, setNuevaFecha] = useState("");

      const handleRenovar = (medico) => {
        setMedicoEditar(medico);
        setNuevaFecha(medico.fecha_vencimiento);
      };
    
      const handleFechaChange = (e) => {
        setNuevaFecha(e.target.value);
      };
    
      const handleActualizarMedico = async (e) => {
        e.preventDefault();
        if (!medicoEditar) return;
    
        const formDataToSend = new FormData();
        formDataToSend.append('nombre', medicoEditar.nombre);
        formDataToSend.append('imagen', medicoEditar.imagen); // Si la imagen no cambia, no necesitas enviarla
        formDataToSend.append('descripcion', medicoEditar.descripcion);
        formDataToSend.append('especialidad', medicoEditar.especialidad);
        formDataToSend.append('email', medicoEditar.email);
        formDataToSend.append('precio', medicoEditar.precio);
        formDataToSend.append('telefono', medicoEditar.telefono);
        formDataToSend.append('fecha_vencimiento', nuevaFecha); // Usar la nueva fecha
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/medicos/${medicoEditar.id}`, {
                method: "POST", // Laravel usa POST con `_method: 'PUT'` en FormData
                credentials: "include",
                body: formDataToSend
            });
    
            if (response.ok) {
                const updatedMedico = await response.json();
                setMedicos(medicos.map(m => m.id === updatedMedico.id ? updatedMedico : m));
                setMedicoEditar(null);
                alert("Fecha de renovación actualizada con éxito");
                setTimeout(() => {
                  window.location.reload();
                }, 2000); // 5000 milisegundos = 5 segundos
            } else {
                const errorData = await response.json();
                console.error("Error en la respuesta del servidor:", errorData);
                alert("Error al actualizar la fecha de renovación");
            }
        } catch (error) {
            console.error("Error en la actualización:", error);
            alert("Hubo un problema al actualizar la fecha");
        }
    };
    
    
    return(
        <>
            <div className="vh-100">
            <div className="adminManejoMedicos pt-5 pb-5 text-center">


            <h2 style={estiloTitulo}>Manejo Médicos</h2>

            <button className="btn btn-outline-primary mb-4" onClick={handleAbrirForm}>Crear médico</button>
            
            
            {Array.isArray(medicosVencidos) && medicosVencidos.length > 0 ? (
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

            <p className="mt-4" dangerouslySetInnerHTML={{ __html: msjEliminar }}></p>

                    {estadoForm &&
                    <form className="curso-form p-4" onSubmit={handleSubmit}>
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
<p className="mt-4" dangerouslySetInnerHTML={{ __html: msjCreado }}></p>
                        </form>
                    }


                    {loading ? ( 
                      <div className="alert mt-5 mx-5" role="alert">
                        <div class="spinner-border text-primary m-auto" role="status">
                        <span class="visually-hidden">Cargando...</span>
                        </div>
                      </div>
                    ) : (
                    <div>
                      <div className="table-responsive w-75 m-auto">
                                  <table
                                    id="usuariosTable"
                                    className="table table-striped table-hover text-start"
                                  >
                                    <thead className="table-dark">
                                      <tr>
                                      <th scope="col">Nombre</th>
                                      <th scope="col">Especialidad</th>
                                      <th scope="col">Teléfono</th>
                                      <th scope="col">Fecha Vencimiento</th>
                                      <th scope="col">Estado</th>
                                      <th scope="col"></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {medicos.map((usuario, index) => (
                                        <tr key={usuario.id}>
                                          <td>{usuario.nombre}</td>
                                          <td>{usuario.especialidad}</td>
                                          <td>{usuario.telefono}</td>
                                          <td>{usuario.fecha_vencimiento}</td>
                                          <td>
                                            {new Date(usuario.fecha_vencimiento) <= fechaActual ? (
                                              <span>Vencido</span> 
                                            ) : (
                                              <span>Activo</span> 
                                            )}
                                          </td>
                                          <td className="text-end">
                                          <button className="btn btn-outline-primary m-1" onClick={() => handleMostrarDetalles(index)}>Detalles</button>
                                          <button onClick={() => handleDelete(usuario.id)} className="btn btn-outline-danger m-1">Eliminar</button>
                                          {new Date(usuario.fecha_vencimiento) <= fechaActual ? (
                                              <button className="btn btn-outline-primary m-1" onClick={() => handleRenovar(usuario)}>Renovar plan</button>

                                            ) : (
                                              <div></div> 
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                      </div>
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

                {medicoEditar && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Renovar Plan</h3>
                            <form className="p-3" onSubmit={handleActualizarMedico}>
                              <div className="text-center">
                                <div className="mt-3">
                                <label>Selecciona nueva fecha de vencimiento:</label>
                                <input 
                                    type="date" 
                                    value={nuevaFecha} 
                                    onChange={handleFechaChange} 
                                    required 
                                    />
                                </div>
                                <div className="mt-3">
                                <button class="btn btn-outline-primary mx-2" type="submit">Actualizar</button>
                                <button class="btn btn-primary mx-2" type="button" onClick={() => setMedicoEditar(null)}>Cancelar</button>
                                </div>
                                    </div>
                            </form>
                        </div>
                    </div>
                )}


            </div>
            </div>
        </>
    )
}

export default ManejoMedicos;