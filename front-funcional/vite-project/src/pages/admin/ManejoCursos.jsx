import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/adminManejoCursos.css'

function ManejoCursos(){
    const [cursos, setCursos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/cursos', {
            method: 'GET',
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => setCursos(data))
        .catch(error => console.error('Error fetch cursos:', error));
    }, []);

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('user'));
        if(usuario.user.role == "admin"){
            console.log("Todo bien");
        }else{
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
            const response = await fetch(`http://127.0.0.1:8000/api/cursos/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if(response.ok){
                console.log("Curso eliminado correctamente");
                setCursos(cursos.filter(curso => curso.id !== id));
            }else {
                console.error("Error al eliminar el curso")
            }
        } catch (error) {
            console.log("Error en la solicitus de eliminació", error);
        }
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('titulo', formData.titulo);
        formDataToSend.append('imagen', formData.imagen); // Añade la imagen al FormData
        formDataToSend.append('descripcion_breve', formData.descripcion_breve);
        formDataToSend.append('categoria', formData.categoria);
        formDataToSend.append('descripcion_completa', formData.descripcion_completa);
        formDataToSend.append('precio', formData.precio);
        formDataToSend.append('telefono', formData.telefono);
    
        try {
          const response = await fetch('http://127.0.0.1:8000/api/cursos', { 
            method: 'POST',
            credentials: 'include',
            body: formDataToSend
          });
          if (response.ok) {
            const data = await response.json();
            console.log('Curso creado exitosamente:', data);
          } else {
            console.error('Error al crear el curso');
          }
        } catch (error) {
          console.error('Error en la solicitud de creación:', error);
        }
      };

 

    return(
        <>
        <div className="vh-100">
                <div className="adminManejoCursos pt-5 pb-5 text-center">

                    <div className="saludo">
                        <h2>Crear cursos</h2>
                    </div>

                    <form className="curso-form p-5" onSubmit={handleSubmit}>
                        {/* <h3>Crear curso</h3> */}
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
                            <label htmlFor="descripcion_breve">Descripción breve:</label>
                            <textarea name="descripcion_breve" id="descripcion_breve" value={formData.descripcion_breve} onChange={handleChange} required />
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="categoria">Categoría:</label>
                            <input className="p-1" type="text" id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} required />
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="descripcion_completa">Descripción completa:</label>
                            <textarea name="descripcion_completa" id="descripcion_completa" value={formData.descripcion_completa} onChange={handleChange} required />
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="precio">Precio:</label>
                            <input className="p-1" type="text" id="precio" name="precio" value={formData.precio} onChange={handleChange} required />
                        </div>
                        <div className="form-group my-4">
                            <label htmlFor="telefono">Teléfono de contacto:</label>
                            <input className="p-1" type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Crear Curso</button>
                        </form>

                {Array.isArray(cursos) && cursos.length > 0 ? (
                    <table className="table mt-5 table-striped table-hover">
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
                                        <button className="btn btn-outline-primary m-1">Detalles</button>
                                        <button onClick={() => handleDelete(curso.id)} className="btn btn-outline-danger m-1">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No se encontraron cursos.</p>
                )}

                </div>
            </div>
        </>
    )
}

export default ManejoCursos;