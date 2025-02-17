import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/adminManejoCursos.css'
import { useColorContext } from '../../context/colorContext';
import gif from '../../assets/gif/check.gif'

function ManejoCursos(){
    const [cursos, setCursos] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
    const [loading, setLoading] = useState(false)

    const [cursosVencidos, setCursosVencidos] = useState([]);

    const [estadoForm, setEstadoForm] = useState(false);
    const [error, setError] = useState('');
    const [msjCreado, setMsjCreado] = useState('');
    const [msjEliminar, setMensajeEliminar] = useState('');
    const navigate = useNavigate();
    const { colors, color } = useColorContext();
    const estiloTitulo = {
        color: color,
      };
    const fechaActual = new Date();

    useEffect(() => {
      setLoading(true)
        fetch('http://127.0.0.1:8000/api/cursos', {
            method: 'GET',
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => {
          setCursos(data);
          const vencidos = data.filter(curso => new Date(curso.fecha_vencimiento) <= fechaActual);
          setCursosVencidos(vencidos);
          setLoading(false);

      })
        .catch(error => {console.error('Error fetch cursos:', error);
          setLoading(false);
        });
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
        titulo: "",
        imagen: "",
        descripcion_breve: "",
        categoria: "",
        descripcion_completa: "",
        precio: "",
        telefono: "",
        fecha_vencimiento: ""
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
            const response = await fetch(`http://127.0.0.1:8000/api/cursos/${id}`, {
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
                console.log("Curso eliminado correctamente");
                setCursos(cursos.filter(curso => curso.id !== id));
                setMensajeEliminar(`<div class="mt-3 d-flex justify-content-center justify-content-center">
                    <div>
                      <img src="${gif}" width="28px" alt="">
                    </div>
                    <div>
                      <p class="mx-2">Curso eliminado correctamente</p>
                    </div>
                  </div> `);
            }else {
                console.error("Error al eliminar el curso")
                setMensajeEliminar(`<div class="mt-3 d-flex justify-content-center justify-content-center">
                    <div>
                      <img src="${gif}" width="28px" alt="">
                    </div>
                    <div>
                      <p class="mx-2">Error al eliminar curso</p>
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
                  <p class="mx-2">Error al eliminar curso</p>
                </div>
              </div> `);
        }
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formDataToSend = new FormData();
        formDataToSend.append('titulo', formData.titulo);
        formDataToSend.append('imagen', formData.imagen); // Añade la imagen al FormData
        formDataToSend.append('descripcion_breve', formData.descripcion_breve);
        formDataToSend.append('categoria', formData.categoria);
        formDataToSend.append('descripcion_completa', formData.descripcion_completa);
        formDataToSend.append('precio', formData.precio);
        formDataToSend.append('telefono', formData.telefono);
        formDataToSend.append('fecha_vencimiento', formData.fecha_vencimiento);
    
        try {
          const response = await fetch('http://127.0.0.1:8000/api/cursos', { 
            method: 'POST',
            credentials: 'include',
            body: formDataToSend
          });
          setMsjCreado('Creando...')
          if (!response.ok) {
            const errorData = await response.json();
            console.log('Error data:', errorData);
            setError(errorData);
            setMsjCreado('Error al crear curso')
            return;
          }
          if (response.ok) {
            const data = await response.json();
            setCursos([...cursos, data])
            setMsjCreado(`<div class="mt-3 d-flex justify-content-center justify-content-center">
                  <div>
                    <img src="${gif}" width="28px" alt="">
                  </div>
                  <div>
                    <p class="mx-2">Curso creado exitosamente</p>
                  </div>
                </div> `);
                // setTimeout(() => {
                //     setMsjCreado('');
                // }, 3000);
            console.log('Curso creado exitosamente:', data);
          } else {
            console.error('Error al crear el curso');
          }
        } catch (error) {
          console.error('Error en la solicitud de creación:', error);
          setMsjCreado('Error al crear curso')
        }
      };

      const handleAbrirForm = () => {
        setEstadoForm(true);
      };
    
      const handleCerrarForm = () => {
        setEstadoForm(false);
      };

      const handleMostrarDetalles = (index) => {
        setCursoSeleccionado(cursos[index]);
    };

    const handleCerrarDetalles = () => {
        setCursoSeleccionado(null);
    };

    // DataTables setup
          useEffect(() => {
            const $ = window.jQuery;
            if (cursos.length > 0) {
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
          }, [cursos]);

    const [cursoEditar, setCursoEditar] = useState(null);
    const [nuevaFecha, setNuevaFecha] = useState("");

    const handleRenovar = (curso) => {
      setCursoEditar(curso);
      setNuevaFecha(curso.fecha_vencimiento);
    };
  
    const handleFechaChange = (e) => {
      setNuevaFecha(e.target.value);
    };

    const handleActualizarCurso = async (e) => {
      e.preventDefault();
      if (!cursoEditar) return;
  
      const formDataToSend = new FormData();
        formDataToSend.append('titulo', cursoEditar.titulo);
        formDataToSend.append('imagen', cursoEditar.imagen); // Añade la imagen al FormData
        formDataToSend.append('descripcion_breve', cursoEditar.descripcion_breve);
        formDataToSend.append('categoria', cursoEditar.categoria);
        formDataToSend.append('descripcion_completa', cursoEditar.descripcion_completa);
        formDataToSend.append('precio', cursoEditar.precio);
        formDataToSend.append('telefono', cursoEditar.telefono);
        formDataToSend.append('fecha_vencimiento', nuevaFecha);
  
      try {
          const response = await fetch(`http://127.0.0.1:8000/api/cursos/${cursoEditar.id}`, {
              method: "POST", // Laravel usa POST con `_method: 'PUT'` en FormData
              credentials: "include",
              body: formDataToSend
          });
  
          if (response.ok) {
              const updatedCurso = await response.json();
              setCursos(cursos.map(m => m.id === updatedCurso.id ? updatedCurso : m));
              setCursoEditar(null);
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
                <div className="adminManejoCursos pt-5 pb-5 text-center">


                        <h2 style={estiloTitulo}>Cursos</h2>
                    <button className="btn btn-outline-primary mb-4" onClick={handleAbrirForm}>Crear curso</button>

                {Array.isArray(cursosVencidos) && cursosVencidos.length > 0 ? (
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
                            <label htmlFor="titulo">Título:</label>
                            <input className="p-1" type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} />
                            {error.titulo && <p style={{ color: 'red' }}>{error.titulo[0]}</p>}
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
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="descripcion_breve">Descripción breve:</label>
                            <textarea name="descripcion_breve" id="descripcion_breve" value={formData.descripcion_breve} onChange={handleChange} />
                            {error.descripcion_breve && <p style={{ color: 'red' }}>{error.descripcion_breve[0]}</p>}
                        </div>
                        {/* <div className="form-group my-4">
                            <label htmlFor="categoria">Categoría:</label>
                            <input className="p-1" type="text" id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} />
                            {error.categoria && <p style={{ color: 'red' }}>{error.categoria[0]}</p>}
                        </div> */}
                        <div className="form-group my-4">

                        <label htmlFor="categoria">Categoría:</label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            id="categoria"
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Seleccione una opción</option>
                            <option value="padres">Padres</option>
                            <option value="bebés">Bebés</option>
                        </select>
                            {error.categoria && <p style={{ color: 'red' }}>{error.categoria[0]}</p>}
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="descripcion_completa">Descripción completa:</label>
                            <textarea name="descripcion_completa" id="descripcion_completa" value={formData.descripcion_completa} onChange={handleChange} />
                            {error.descripcion_completa && <p style={{ color: 'red' }}>{error.descripcion_completa[0]}</p>}
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
                        <button type="submit" className="btn btn-outline-primary m-2">Crear curso</button>
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
                <th scope="col">Título</th>
                <th scope="col">Descripción</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Fecha Vencimiento</th>
                <th scope="col">Estado</th>
                <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {cursos.map((usuario, index) => (
                  <tr key={usuario.id}>
                    <td>{usuario.titulo}</td>
                    <td>{usuario.descripcion_breve}</td>
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

                {/* {Array.isArray(cursos) && cursos.length > 0 ? (
                    <table className="table mt-5 table-striped table-hover text-start">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col">Precio</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cursos.map((curso, index) => (
                                <tr key={index}>
                                    <td>{curso.titulo}</td>
                                    <td>{curso.descripcion_breve}</td>
                                    <td>{curso.telefono}</td>
                                    <td>${curso.precio}</td>
                                    <td>
                                    <button className="btn btn-outline-primary m-1" onClick={() => handleMostrarDetalles(index)}>Detalles</button>
                                    <button onClick={() => handleDelete(curso.id)} className="btn btn-outline-danger m-1">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No se encontraron cursos.</p>
                )} */}


{/* <h2 className="mt-5" style={estiloTitulo}>Servicios vencidos</h2> */}

{/* {Array.isArray(cursosVencidos) && cursosVencidos.length > 0 ? (
                    <table className="table mt-5 table-striped table-hover text-start">
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
                            {cursosVencidos.map((curso, index) => (
                                <tr key={index}>
                                    <td>{curso.titulo}</td>
                                    <td>{curso.descripcion_breve}</td>
                                    <td>{curso.telefono}</td>
                                    <td>${curso.precio}</td>
                                    <td>
                                    <button className="btn btn-outline-primary m-1" onClick={() => handleMostrarDetalles(index)}>Detalles</button>
                                    <button onClick={() => handleDelete(curso.id)} className="btn btn-outline-danger m-1">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                  <p className="mt-5">No se encontraron servicios vencidos.</p>
                )} */}

</div>
          )}

{cursoEditar && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Renovar Plan</h3>
                            <form className="p-3" onSubmit={handleActualizarCurso}>
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
                                <button class="btn btn-primary mx-2" type="button" onClick={() => setCursoEditar(null)}>Cancelar</button>
                                </div>
                                    </div>
                            </form>
                        </div>
                    </div>
                )}

                {cursoSeleccionado && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="modal-close" onClick={handleCerrarDetalles}>&times;</span>
                            <img src={'http://127.0.0.1:8000/' + cursoSeleccionado.imagen} width="100%" className="card-img-top" alt="" />
                            <h3 className="my-2">Detalles del Curso</h3>
                            <p className="text-start"><span className="fw-bold">Título:</span> {cursoSeleccionado.titulo}</p>
                            <p className="text-start"><span className="fw-bold">Descripción:</span> {cursoSeleccionado.descripcion_completa}</p>
                            <p className="text-start"><span className="fw-bold">Categoría:</span> {cursoSeleccionado.categoria}</p>
                            <p className="text-start"><span className="fw-bold">Teléfono:</span> {cursoSeleccionado.telefono}</p>
                            <p className="text-start"><span className="fw-bold">Precio</span>: ${cursoSeleccionado.precio}</p>
                            <p className="text-start"><span className="fw-bold">Vencimiento</span>: {cursoSeleccionado.fecha_vencimiento}</p>
                            <button className="btn btn-outline-primary" onClick={handleCerrarDetalles}>Cerrar</button>
                        </div>
                    </div>
                )}

                </div>
            </div>
        </>
    )
}

export default ManejoCursos;