import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/adminBlog.css'

function Blog(){
    const [blogs, setBlogs] = useState([]);
    const [estadoForm, setEstadoForm] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        titulo: "",
        contenido: "",
        autor: "",
        imagen: "",
        fecha_publicacion: ""
      });

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('user'));
        if(usuario.user.role == "admin"){
            console.log("Todo bien");
        }else{
            navigate('/home');
        }
    }, [navigate]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/blogs', {
            method: 'GET',
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => setBlogs(data))
        .catch(error => console.error('Error fetch cursos:', error));
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/blogs/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if(response.ok){
                console.log("Nota eliminado correctamente");
                setBlogs(blogs.filter(blog => blog.id !== id));
            }else {
                console.error("Error al eliminar la nota")
            }
        } catch (error) {
            console.log("Error en la solicitus de eliminació", error);
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
          if (response.ok) {
            const data = await response.json();
            console.log('Nota creado exitosamente:', data);
          } else {
            console.error('Error al crear la nota');
          }
        } catch (error) {
          console.error('Error en la solicitud de creación:', error);
        }
      };

    const handleAbrirForm = () => {
        setEstadoForm(true);
      };
    
      const handleCerrarForm = () => {
        setEstadoForm(false);
      };

    return(
        <>
        <div className="vh-100">
                <div className="adminBlog pt-5 pb-5 text-center">
            <h2>Blog</h2>

            <button className="btn btn-outline-primary mb-4" onClick={handleAbrirForm}>Crear nota de blog</button>


            {estadoForm &&
                    <form className="curso-form p-5" 
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
                        <button type="submit" className="btn btn-outline-primary m-2">Crear Curso</button>
                        <button type="button" className="btn btn-primary m-2" onClick={handleCerrarForm}>Cancelar</button>
                        </form>
                    }



            <table className="table mt-5 table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Contenido</th>
                                <th scope="col">Autor</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog, index) => (
                                <tr key={index}>
                                    <td>{blog.titulo}</td>
                                    <td>{blog.contenido}</td>
                                    <td>{blog.autor}</td>
                                    <td>
                                        <button className="btn btn-outline-primary m-1">Detalles</button>
                                        <button onClick={() => handleDelete(blog.id)} className="btn btn-outline-danger m-1">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
            </table>
            </div>
            </div>
        </>
    )
}

export default Blog;