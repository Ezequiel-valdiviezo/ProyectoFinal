import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/adminBlog.css'

function Blog(){
    const [blogs, setBlogs] = useState([]);
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

    return(
        <>
            <h2>Blog</h2>

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
        </>
    )
}

export default Blog;