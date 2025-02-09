import React, { useState, useEffect } from "react";
import '../styles/perfil.css'
import img from '../assets/2.png'
import { useColorContext } from '../context/colorContext';
import { useNavigate } from "react-router-dom";

import imgAvatar1 from '../assets/avatar/1.jpg'; // Importa las imágenes de los avatares
import imgAvatar2 from '../assets/avatar/2.jpg'; // Importa las imágenes de los avatares
import imgAvatar3 from '../assets/avatar/3.jpg'; // Importa las imágenes de los avatares
import imgAvatar4 from '../assets/avatar/4.jpg'; // Importa las imágenes de los avatares
import imgAvatar5 from '../assets/avatar/5.jpg'; // Importa las imágenes de los avatares
import imgAvatar6 from '../assets/avatar/6.jpg'; // Importa las imágenes de los avatares


function Perfil(){

  const [cursoSeleccionado, setCursoSeleccionado] = useState(false);
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({})
  const [msjEdit, setMsjEdit] = useState('');
  const [loader, setLoader] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    avatar: "",
    email: "",
    name: "",
  });
  const { colors, color } = useColorContext();
  const estiloTitulo = {
      color: color,
    };

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
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.user.id;
    fetch(`http://127.0.0.1:8000/api/user/${userId}`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Datos del usuario:', data);
      setUsuario(data[0]);
      setFormData({
        avatar: data[0].avatar,
        email: data[0].email,
        name: data[0].name
      });
      setLoading(false); // Mover aquí
    })
    .catch(error => {console.error('Error fetching perfil:', error);
      setLoading(false); // Mover aquí

    });
  }, []);

  const handleMostrarDetalles = () => {
    setCursoSeleccionado(true);
};

  const handleCerrarDetalles = () => {
    setCursoSeleccionado(false);
};

const handleChange = (e) => {
  const { name, value, files } = e.target; // Extrae el nombre del campo, el valor y los archivos (en caso de ser un campo de tipo archivo) del evento e.target
  // console.log();
  if (name === 'imagen') { // Verifica si el nombre del campo es 'imagen'
    setFormData({ // Actualiza el estado formData con los nuevos valores
      ...formData, // Mantiene los valores existentes en formData
      imagen: files[0] // Asigna el primer archivo seleccionado a formData.imagen
    });
  } else {
    setFormData({ // Actualiza el estado formData con los nuevos valores
      ...formData, // Mantiene los valores existentes en formData
      [name]: value // Actualiza el campo correspondiente (nombre, email, etc.) con el nuevo valor
    });
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Aquí puedes manejar el envío de los datos del formulario
  console.log(formData);
  const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.user.id;

    fetch(`http://127.0.0.1:8000/api/user/${userId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
      // body: data
    })
    .then(response => response.json())
    .then(data => {
      console.log('Datos del usuario:', data);
      setLoader("Actualizando perfil")
      handleCerrarDetalles();
      setMsjEdit("Perfil editado exitosamente")
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch(error => console.error('Error fetching editar perfil:', error));
  // handleCerrarDetalles();
};

const obtenerImagenAvatar = () => {
  if (usuario.avatar === "avatar1") {
    return imgAvatar1; // Devuelve la imagen del avatar 1
  } else if (usuario.avatar === "avatar2") {
    return imgAvatar2; // Devuelve la imagen del avatar 2
  } else if (usuario.avatar === "avatar3") {
    return imgAvatar3; // Devuelve la imagen del avatar 2
  } else if (usuario.avatar === "avatar4") {
    return imgAvatar4; // Devuelve la imagen del avatar 2
  }else if (usuario.avatar === "avatar5") {
    return imgAvatar5; // Devuelve la imagen del avatar 2
  }else if (usuario.avatar === "avatar6") {
    return imgAvatar6; // Devuelve la imagen del avatar 2
  }else {
    return img; // Devuelve una imagen por defecto o la que estás utilizando actualmente
  }
};

    return(
      <div className="fondoPerfil vh-100">
        <div className="perfil">

        <h2 className="text-center pt-5" style={estiloTitulo}>Mi perfil</h2>

        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            
          {msjEdit && 
              <div className="alert alert-success d-flex align-items-center mt-5 mx-5" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="0" height="24" role="img" aria-label="success:">
                        <use xlinkHref="#exclamation-triangle-fill" />
                    </svg>
                    <div>
                    {msjEdit}
                    </div>
                </div>
            }

{loading ? ( 
                            <div className="alert d-flex justify-content-center mt-5 mx-5" role="alert">
                                <div class="spinner-border text-primary m-auto" role="status">
                                <span class="visually-hidden">Cargando...</span>
                                </div>
                            </div>
                    ) : (

            <div className="col col-lg-8 mb-4 mb-lg-0">
              <div className="card tarjetaPerfil mb-3" style={{ borderRadius: "0.5rem" }}>
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <img
                      src={obtenerImagenAvatar()}
                      // src={'http://127.0.0.1:8000/' + usuario.imagen}
                      alt="Avatar"
                      className="img-fluid my-5"
                      style={{ width: "80px" }}
                    />
                    <h5>{usuario.name}</h5>
                    <button className="btn btn-outline-primary mb-4" onClick={() => handleMostrarDetalles()}>Editar perfil</button>
                    {/* <i className="far fa-edit mb-5"></i> */}
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Información</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <p className="text-muted">{usuario.email}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Nombre</h6>
                          <p className="text-muted">{usuario.name}</p>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Foro</h6>
                          <p className="text-muted"><a href="/foro/misPublicaciones">Ver mis publicaciones</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

)}

            {cursoSeleccionado && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="modal-close" onClick={handleCerrarDetalles}>&times;</span>
                            <h3 style={estiloTitulo}>Editar Perfil</h3>
                            <form onSubmit={handleSubmit}>
                              <div className="form-group my-4">
                      <label className="mb-2">Elegir Avatar</label>
                      <div className="d-flex flex-wrap">
                      <div className="d-flex align-items-center mb-3 mx-2">
                        <img
                          src={imgAvatar1} // Imagen del avatar 1
                          alt="Avatar 1"
                          className="img-fluid avatar-preview mx-2"
                          width={50}
                        />
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="avatar"
                            id="avatar1"
                            value="avatar1"
                            checked={formData.avatar === "avatar1"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="avatar1">
                            Avatar 1
                          </label>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-3 mx-2">
                        <img
                          src={imgAvatar2} // Imagen del avatar 2
                          alt="Avatar 2"
                          className="img-fluid avatar-preview mx-2"
                          width={50}
                        />
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="avatar"
                            id="avatar2"
                            value="avatar2"
                            checked={formData.avatar === "avatar2"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="avatar2">
                            Avatar 2
                          </label>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-3 mx-2">
                        <img
                          src={imgAvatar3} // Imagen del avatar 2
                          alt="Avatar 3"
                          className="img-fluid avatar-preview mx-2"
                          width={50}
                        />
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="avatar"
                            id="avatar3"
                            value="avatar3"
                            checked={formData.avatar === "avatar3"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="avatar3">
                            Avatar 3
                          </label>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-3 mx-2">
                        <img
                          src={imgAvatar4} // Imagen del avatar 2
                          alt="Avatar 4"
                          className="img-fluid avatar-preview mx-2"
                          width={50}
                        />
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="avatar"
                            id="avatar4"
                            value="avatar4"
                            checked={formData.avatar === "avatar4"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="avatar4">
                            Avatar 4
                          </label>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-3 mx-2">
                        <img
                          src={imgAvatar5} // Imagen del avatar 2
                          alt="Avatar 5"
                          className="img-fluid avatar-preview mx-2"
                          width={50}
                        />
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="avatar"
                            id="avatar5"
                            value="avatar5"
                            checked={formData.avatar === "avatar5"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="avatar2">
                            Avatar 5
                          </label>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-3 mx-2">
                        <img
                          src={imgAvatar6} // Imagen del avatar 2
                          alt="Avatar 6"
                          className="img-fluid avatar-preview mx-2"
                          width={50}
                        />
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="avatar"
                            id="avatar6"
                            value="avatar6"
                            checked={formData.avatar === "avatar6"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="avatar6">
                            Avatar 6
                          </label>
                        </div>
                      </div>
                      </div>
                    </div>
                              <div className="form-group my-4">
                                <label className="mb-2" htmlFor="email">Email</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group my-4">
                                <label className="mb-2" htmlFor="name">Nombre</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="name"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                />
                              </div>


                              {loader && 
                                <div className="alert alert-success d-flex align-items-center mt-5 mx-5" role="alert">
                                      <div class="spinner-border text-primary" role="status">
                                        <span class="visually-hidden">Cargando...</span>
                                      </div>
                                      <div>
                                      {loader}
                                      </div>
                                  </div>
                              }

                              <button type="submit" className="btn btn-primary mt-3">Guardar</button>
                              <button onClick={handleCerrarDetalles} className="btn btn-secondary mt-3 mx-1">Cerrar</button>
                            </form>
                        </div>
                    </div>
                )}          

          </div>
        </div>
      </div>
      </div>
    )
}

export default Perfil;