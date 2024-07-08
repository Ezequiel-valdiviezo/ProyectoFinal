import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/adminCursos.css'

function ManejoCursos(){
    const navigate = useNavigate();
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
                <div className="adminMedicos pt-5 text-center">

                    <div className="saludo">
                        <h2>Cursos</h2>
                    </div>

                    <form className="curso-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="titulo">Título:</label>
                            <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
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
                        <div className="form-group">
                            <label htmlFor="descripcion_breve">Descripción breve:</label>
                            <textarea name="descripcion_breve" id="descripcion_breve" value={formData.descripcion_breve} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="categoria">Categoría:</label>
                            <input type="text" id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descripcion_completa">Descripción completa:</label>
                            <textarea name="descripcion_completa" id="descripcion_completa" value={formData.descripcion_completa} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="precio">Precio:</label>
                            <input type="text" id="precio" name="precio" value={formData.precio} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono de contacto:</label>
                            <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required />
                        </div>
                        <button type="submit">Crear Curso</button>
                        </form>

                </div>
            </div>
        </>
    )
}

export default ManejoCursos;