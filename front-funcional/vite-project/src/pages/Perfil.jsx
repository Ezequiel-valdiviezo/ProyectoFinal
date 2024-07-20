import React, { useState, useEffect } from "react";
import '../styles/perfil.css'
import img from '../assets/2.png'
import { useColorContext } from '../context/colorContext';

import imgAvatar1 from '../assets/avatar/avatar1.png'; // Importa las imágenes de los avatares
import imgAvatar2 from '../assets/avatar/avatar2.png'; // Importa las imágenes de los avatares


function Perfil(){

  const [cursoSeleccionado, setCursoSeleccionado] = useState(false);
  const [usuario, setUsuario] = useState({})
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
    })
    .catch(error => console.error('Error fetching perfil:', error));
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
      // alert("Actualizado correctamente");
      window.location.reload();
    })
    .catch(error => console.error('Error fetching editar perfil:', error));
  // handleCerrarDetalles();
};

const obtenerImagenAvatar = () => {
  if (usuario.avatar === "avatar1") {
    return imgAvatar1; // Devuelve la imagen del avatar 1
  } else if (usuario.avatar === "avatar2") {
    return imgAvatar2; // Devuelve la imagen del avatar 2
  } else {
    return img; // Devuelve una imagen por defecto o la que estás utilizando actualmente
  }
};

    return(
      <div className="fondoPerfil vh-100">
        <div className="perfil">

        <h2 className="text-center pt-5" style={estiloTitulo}>Mi perfil</h2>

        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            
            <div className="col col-lg-8 mb-4 mb-lg-0">
              <div className="card tarjetaPerfil mb-3" style={{ borderRadius: ".5rem" }}>
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

            {cursoSeleccionado && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="modal-close" onClick={handleCerrarDetalles}>&times;</span>
                            <h3 style={estiloTitulo}>Editar Perfil</h3>
                            <form onSubmit={handleSubmit}>
                              {/* <div className="form-group my-4">
                                <label className="mb-2" htmlFor="imagen">Foto de Perfil</label>
                                <input
                                  type="file"
                                  className="form-control"
                                  id="imagen"
                                  name="imagen"
                                  accept="image/*"
                                  onChange={handleChange}
                                />
                              </div> */}
                              <div className="form-group my-4">
                      <label className="mb-2">Elegir Avatar</label>
                      <div className="d-flex align-items-center mb-3">
                        <img
                          src={imgAvatar1} // Imagen del avatar 1
                          alt="Avatar 1"
                          className="img-fluid avatar-preview mx-2"
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
                      <div className="d-flex align-items-center">
                        <img
                          src={imgAvatar2} // Imagen del avatar 2
                          alt="Avatar 2"
                          className="img-fluid avatar-preview mx-2"
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