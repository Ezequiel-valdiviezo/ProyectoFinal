import React, { useEffect, useState } from "react";
// import '../styles/misPublicaciones.css'
import { useColorContext } from "../context/colorContext";
import imgAvatar1 from '../assets/avatar/avatar1.png'
import imgAvatar2 from '../assets/avatar/avatar2.png'

function MisPublicaciones(){


    const [publicaciones, setPublicaciones] = useState([]);
    const [comentario, setComentario] = useState([]);

  const { colors, color } = useColorContext();
  const estiloTitulo = {
      color: color,
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.user.id;

      fetch(`http://127.0.0.1:8000/api/foro/${userId}`, {
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

    return(
        <>
            <div className="container foro pt-5">
      <h2 className="text-center" style={estiloTitulo}>Mis publicaciones</h2>
      {/* <p className="fs-3 fw-bold">¡Hola {user.user.name}!</p> */}
      <p className="text-center">Desde acá vas a poder ver tus publicaciones realizadas en nuestro foro, con sus comentarios.</p>

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

              {/* <hr /> */}

              <ul className="list-group list-group-flush mt-3">
                {post.comments.map((comment, index) => (
                    <li className="list-group-item custom-background" key={index}>
                        <hr />
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
        </>
    )
}

export default MisPublicaciones;