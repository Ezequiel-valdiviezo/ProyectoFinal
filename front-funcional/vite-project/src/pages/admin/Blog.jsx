import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/adminBlog.css'
import gif from '../../assets/gif/check.gif'
import { useColorContext } from '../../context/colorContext';

function Blog(){
    const [blogs, setBlogs] = useState([]);
    const [estadoForm, setEstadoForm] = useState(false);
    const navigate = useNavigate();

    const [msjCreado, setMsjCreado] = useState('');

    const [msjEliminar, setMensajeEliminar] = useState('');
    const [loading, setLoading] = useState(false)

    const [notaSeleccionada, setNotaSeleccionada] = useState(null);

    const [formData, setFormData] = useState({
        titulo: "",
        contenido: "",
        autor: "",
        imagen: "",
        fecha_publicacion: ""
      });

    //Guarda la pagina actual
    const [currentPage, setCurrentPage] = useState(1);
    //elementos a mostrar por pagina
    const [itemsPerPage] = useState(5);


    const { colors, color } = useColorContext();
    const estiloTitulo = {
        color: color,
      };

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

    useEffect(() => {
      setLoading(true)
        fetch('http://127.0.0.1:8000/api/blogs', {
            method: 'GET',
            credentials: "include",
        })
        .then(response => response.json())
        .then(data =>{ 
          setBlogs(data)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetch cursos:', error)
          setLoading(false)
        });
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/blogs/${id}`, {
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
                console.log("Nota eliminado correctamente");
                setBlogs(blogs.filter(blog => blog.id !== id));
                setMensajeEliminar(`<div class="mt-3 d-flex justify-content-center justify-content-center">
                  <div>
                    <img src="${gif}" width="28px" alt="">
                  </div>
                  <div>
                    <p class="mx-2">Nota eliminada correctamente</p>
                  </div>
                </div> `);
            }else {
                console.error("Error al eliminar la nota")
            }
        } catch (error) {
            console.log("Error en la solicitus de eliminació", error);
            setMensajeEliminar(`<div class="mt-3 d-flex justify-content-center justify-content-center">
              <div>
                <img src="${gif}" width="28px" alt="">
              </div>
              <div>
                <p class="mx-2">Error al eliminar nota</p>
              </div>
            </div> `);
        }
      }

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

      const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('titulo', formData.titulo);
        formDataToSend.append('imagen', formData.imagen);
        formDataToSend.append('contenido', formData.contenido);
        formDataToSend.append('autor', formData.autor);
        formDataToSend.append('fecha_publicacion', formData.fecha_publicacion);
    
        try {
          const response = await fetch('http://127.0.0.1:8000/api/blogs', { 
            method: 'POST',
            credentials: 'include',
            body: formDataToSend
          });
          setMsjCreado('Creando...')

          if(!response.ok){
            const errorData = await response.json();
            console.log('Error data:', errorData);
            setMsjCreado('Error al crear nota')
            return;
          }

          if (response.ok) {
            const data = await response.json();
            setBlogs([...blogs, data])
            setMsjCreado(`<div class="mt-3 d-flex justify-content-center justify-content-center">
                  <div>
                    <img src="${gif}" width="28px" alt="">
                  </div>
                  <div>
                    <p class="mx-2">Nota creada exitosamente</p>
                  </div>
                </div> `);
                // setTimeout(() => {
                //     setMsjCreado('');
                // }, 3000); 
            console.log('Nota creado exitosamente:', data);
          } else {
            console.error('Error al crear la nota');
          }
        } catch (error) {
          console.error('Error en la solicitud de creación:', error);
          setMsjCreado('Error al crear nota')
        }
      };

    const handleAbrirForm = () => {
        setEstadoForm(true);
      };
    
      const handleCerrarForm = () => {
        setEstadoForm(false);
      };

      const handleMostrarDetalles = (index) => {
        setNotaSeleccionada(blogs[index]);
      };

      const handleCerrarDetalles = () => {
        setNotaSeleccionada(null);
      };

    // Calculan los indices de los elementos a mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Contiene los elementos de la página actual
    const currentItems = Array.isArray(blogs) ? blogs.slice(indexOfFirstItem, indexOfLastItem) : [];

    // Cambia la pagina al numero seleccionado
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return(
        <>
        <div className="vh-100">
                <div className="adminBlog pt-5 pb-5 text-center">
            <h2 style={estiloTitulo}>Blog</h2>

            <button className="btn btn-outline-primary mb-4" onClick={handleAbrirForm}>Crear nota de blog</button>

            <p className="mt-4" dangerouslySetInnerHTML={{ __html: msjEliminar }}></p>

            {estadoForm &&
                    <form className="curso-form p-4" 
                    onSubmit={handleSubmit}>
                        {/* <h3>Crear nota</h3> */}
                        <div className="form-group my-4">
                            <label htmlFor="titulo">Título:</label>
                            <input className="p-1" type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
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
                            <label htmlFor="contenido">Contenido: </label>
                            <textarea name="contenido" id="contenido" value={formData.contenido} onChange={handleChange} required />
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="autor">Autor: </label>
                            <input className="p-1" type="text" id="autor" name="autor" value={formData.autor} onChange={handleChange} required />
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="fecha_publicacion">Fecha de publicación:</label>
                            <input className="p-1" type="date" id="fecha_publicacion" name="fecha_publicacion" value={formData.fecha_publicacion} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-outline-primary m-2">Crear nota</button>
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
          {Array.isArray(blogs) && blogs.length > 0 ? (
            <div>
            <table className="table mt-5 table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Título</th>
                                <th scope="col">Contenido</th>
                                <th scope="col">Autor</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((blog, index) => (
                                <tr key={index}>
                                    <td>{blog.titulo}</td>
                                    <td>{blog.contenido}</td>
                                    <td>{blog.autor}</td>
                                    <td>
                                        <button className="btn btn-outline-primary m-1" onClick={() => handleMostrarDetalles(index)}>Detalles</button>
                                        <button onClick={() => handleDelete(blog.id)} className="btn btn-outline-danger m-1">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
            </table>

            <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center mt-3">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Anterior</a>
                </li>
                {[...Array(Math.ceil(blogs.length / itemsPerPage)).keys()].map(number => (
                    <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                        <a className="page-link" href="#" onClick={() => paginate(number + 1)}>
                            {number + 1}
                        </a>
                    </li>
                ))}
                <li className={`page-item ${currentPage === Math.ceil(blogs.length / itemsPerPage) ? 'disabled' : ''}`}>
                    <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Siguiente</a>
                </li>
            </ul>
            </nav>
            </div>


              ) : (
                <p>No se encontraron blogs.</p>
              )}
              </div>
          )}

                {notaSeleccionada && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="modal-close" onClick={handleCerrarDetalles}>&times;</span>
                            <img src={'http://127.0.0.1:8000/' + notaSeleccionada.imagen} width="100%" className="card-img-top" alt="" />
                            <h3 className="my-2">Detalles del Curso</h3>
                            <p className="text-start"><span className="fw-bold">Título:</span> {notaSeleccionada.titulo}</p>
                            <p className="text-start"><span className="fw-bold">Contenido:</span> {notaSeleccionada.contenido}</p>
                            <p className="text-start"><span className="fw-bold">Autor:</span> {notaSeleccionada.autor}</p>
                            <p className="text-start"><span className="fw-bold">Fecha de publicación: </span>{notaSeleccionada.fecha_publicacion}</p>
                            <button className="btn btn-outline-primary" onClick={handleCerrarDetalles}>Cerrar</button>
                        </div>
                    </div>
                )}


            </div>
            </div>
        </>
    )
}

export default Blog;