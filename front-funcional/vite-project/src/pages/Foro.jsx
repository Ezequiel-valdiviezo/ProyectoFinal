import React, { useEffect, useState } from "react";
import '../styles/foro.css'
import img from '../assets/fond1.jpeg'
import img2 from '../assets/2.png'
import { useColorContext } from '../context/colorContext';
import { useNavigate } from "react-router-dom";

import imgAvatar1 from '../assets/avatar/avatar1.png'; // Importa las imágenes de los avatares
import imgAvatar2 from '../assets/avatar/avatar2.png'; // Importa las imágenes de los avatares


function Foro(){

    const [publicaciones, setPublicaciones] = useState([]);
    const [comentario, setComentario] = useState([]);
    const [msjPublicacion, setMsjPublicacion] = useState('');
    const [msjComentario, setMsjComentario] = useState('');
    const navigate = useNavigate();

  const { colors, color } = useColorContext();
  const estiloTitulo = {
      color: color,
    };

    const [formData, setFormData] = useState({
      titulo: '',
      imagen: null,
      contenido: ''
    });

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
      fetch(`http://127.0.0.1:8000/api/foro`, {
        method: 'GET',
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPublicaciones(data);
        } else {
          console.error('Unexpected API response:', data);
        }
      })
      .catch(error => console.error('Error fetching recuerdos:', error));
    }, []);

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

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.user.id;

    const formDataToSend = new FormData();
    formDataToSend.append('titulo', formData.titulo);
    formDataToSend.append('imagen', formData.imagen);
    formDataToSend.append('contenido', formData.contenido);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/foro/${userId}`, {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend
      });

      if (response.ok) {
        const data = await response.json();
        // setPublicaciones([...publicaciones, data]);
        console.log('Recuerdo guardado exitosamente');
        setMsjPublicacion("Publicación guardada exitosamente")
        setTimeout(() => {
          setMsjPublicacion('');
          window.location.reload();
        }, 2000);
      } else {
        console.error('Error al guardar el recuerdo');
      }
    } catch (error) {
      console.error('Error en la solicitud de guardado:', error);
    }
    
  };

  const handleCommentSubmit = async (id, value) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.user.id;

    const formDataToSend = new FormData();
    formDataToSend.append('comentario', value);
    formDataToSend.append('user_id', userId);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/foro/${id}/comentario`, {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend
      });

      if (response.ok) {
        const data = response.json();
        // setPublicaciones([...publicaciones, data]);
        console.log('Comentario guardado exitosamente');
        setMsjComentario("Comentario guardado exitosamente")
        setTimeout(() => {
          setMsjComentario('');
          window.location.reload();
        }, 2000);
      } else {
        console.error('Error al guardar el recuerdo');
      }
    } catch (error) {
      console.error('Error en la solicitud de guardado:', error);
    }

  }

  const user = JSON.parse(localStorage.getItem('user'));

  const obtenerImagenAvatar = (avatar) => {
    switch (avatar) {
      case "avatar1":
        return imgAvatar1;
      case "avatar2":
        return imgAvatar2;
      default:
        return img;
    }
  };

  return (
    <div className="container foro pt-5">
      <h2 className="text-center" style={estiloTitulo}>Foro</h2>
      <p className="fs-3 fw-bold">¡Hola {user.user.name}!</p>
      <p>Conectá con otros padres que están o estuvieron en la misma situación.</p>
      <form onSubmit={handlePostSubmit} className="p-4">
        <p>Crear publicación</p>
        {msjPublicacion && 
              <div className="alert alert-success d-flex align-items-center mt-5" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="0" height="24" role="img" aria-label="success:">
                        <use xlinkHref="#exclamation-triangle-fill" />
                    </svg>
                    <div>
                    {msjPublicacion}
                    </div>
                </div>
            }
        <div className="mb-3">
        <label htmlFor="titulo">Título</label>
          <input 
            className="form-control" 
              id="titulo"
              name="titulo"
              rows="3"
              value={formData.titulo}
              onChange={handleChange}
            placeholder="Escribe tu pregunta o comentario aquí..."
          ></input>
        </div>
        <div className="mb-3">
        <label htmlFor="contenido">Contenido</label>
          <textarea 
            className="form-control" 
            id="contenido"
              name="contenido"
              rows="3"
              value={formData.contenido}
              onChange={handleChange}
            placeholder="Escribe tu pregunta o comentario aquí..."
          ></textarea>
        </div>
        <div className="form-container">    
          <div className="form-group">
            {/* <label htmlFor="imagen">Imagen</label> */}
            <input
              type="file"
              className="form-control cargaImg"
              id="imagen"
              name="imagen"
              accept="image/*"
              onChange={handleChange}
              />
          </div>
          <button className="btn btn-primary" type="submit">Publicar</button>
        </div>
      </form>

      <div className="comentario mt-5">

        

        <ul className="list-group">
          {publicaciones.map(post => (
            <li className="list-group-item custom-background mb-5" key={post.id}>
              <div className="">
                <img 
                src={obtenerImagenAvatar(post.user.avatar)}
                className="imgPerfilForo" 
                alt="Avatar" 
                />
                <strong>{post.user.name}</strong>
                <h3 className="m-2 p-2">{post.titulo}</h3>
                <p className="mx-2 px-2">{post.contenido}</p>
                <img src={'http://127.0.0.1:8000/' + post.imagen} alt={post.imagen} width={"400px"} />
                <p className="text-end">{post.created_at}</p>
              </div>

              <div className="mt-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Añadir un comentario..." 
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        handleCommentSubmit(post.id, e.target.value.trim());
                        e.target.value = '';
                      }
                    }}
                    />
              </div>

              {msjComentario && 
              // <p className="text-center">{msjComentario}</p>
              <div className="alert alert-success d-flex align-items-center mt-5 mx-5" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="0" height="24" role="img" aria-label="success:">
                        <use xlinkHref="#exclamation-triangle-fill" />
                    </svg>
                    <div>
                    {msjComentario}
                    </div>
                </div>
            }

              <ul className="list-group list-group-flush mt-3">
                {post.comments.map((comment, index) => (
                  <li className="list-group-item custom-background" key={index}>
                    <img 
                    src={obtenerImagenAvatar(comment.user.avatar)}
                    className="imgPerfilForo" 
                    alt="" 
                    />
                    {comment.user.name}: {comment.comentario}
                    <br />
                    <div className="mt-2 text-end">{comment.created_at}</div> 
                  </li>
                ))}
              </ul>

              
            </li>
          ))}
        </ul>
        
      </div>
    </div>
  );
};

export default Foro;