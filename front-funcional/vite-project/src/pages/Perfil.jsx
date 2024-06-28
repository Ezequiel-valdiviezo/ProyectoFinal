import React, { useState, useEffect } from "react";
import '../styles/perfil.css'
import img from '../assets/2.png'


function Perfil(){

  const [cursoSeleccionado, setCursoSeleccionado] = useState(false);
  const [formData, setFormData] = useState({
    fotoPerfil: null,
    email: "ezequiel@gmail.com",
    nombre: "Ezequiel",
    rol: "Padre",
    password: ""
  });

  const handleMostrarDetalles = () => {
    setCursoSeleccionado(true);
};

  const handleCerrarDetalles = () => {
    setCursoSeleccionado(false);
};

const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (name === 'fotoPerfil') {
    setFormData({
      ...formData,
      fotoPerfil: files[0]
    });
  } else {
    setFormData({
      ...formData,
      [name]: value
    });
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Aquí puedes manejar el envío de los datos del formulario
  console.log(formData);
  handleCerrarDetalles();
};

    return(
      <div className="fondoPerfil vh-100">
        <div className="perfil">

        <h2 className="text-center pt-5">Mi perfil</h2>

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
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar"
                      className="img-fluid my-5"
                      style={{ width: "80px" }}
                    />
                    <h5>Ezequiel</h5>
                    <button className="btn btn-outline-primary" onClick={() => handleMostrarDetalles()}>Editar perfil</button>
                    {/* <i className="far fa-edit mb-5"></i> */}
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Información</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <p className="text-muted">ezequiel@gmail.com</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Nombre</h6>
                          <p className="text-muted">Ezequiel</p>
                        </div>
                      </div>
                      {/* <h6>Projects</h6> */}
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Rol</h6>
                          <p className="text-muted">Padre</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Most Viewed</h6>
                          <p className="text-muted">Dolor sit amet</p>
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
                            <h3>Editar Perfil</h3>
                            <form onSubmit={handleSubmit}>
                              <div className="form-group my-3">
                                <label htmlFor="fotoPerfil">Foto de Perfil</label>
                                <input
                                  type="file"
                                  className="form-control"
                                  id="fotoPerfil"
                                  name="fotoPerfil"
                                  accept="image/*"
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group my-3">
                                <label htmlFor="email">Email</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group my-3">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="nombre"
                                  name="nombre"
                                  value={formData.nombre}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group my-3">
                                <label htmlFor="rol">Rol</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="rol"
                                  name="rol"
                                  value={formData.rol}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group my-3">
                                <label htmlFor="contraseña">Contraseña</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="contraseña"
                                  name="contraseña"
                                  value={formData.contraseña}
                                  onChange={handleChange}
                                />
                              </div>
                              <button type="submit" className="btn btn-primary mt-3">Guardar</button>
                              <button onClick={handleCerrarDetalles} className="btn btn-secondary mt-3">Cerrar</button>
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