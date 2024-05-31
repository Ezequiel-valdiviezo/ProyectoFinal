import React, {useState} from "react";
import '../styles/register.css'
import imgg from '../assets/be.png'


function Register({ onToggle }){

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Aquí puedes añadir la lógica para enviar los datos a un servidor o procesarlos de otra manera
  };

  return(
    <>
    <div className="register d-flex flex-column justify-content-center align-items-center text-center vh-100">
      <div className="cardContenido p-5">
        <h1>¡Bienvenido a NatUser!</h1>
            <p>Registrate y accede a todas las funcionalidad para nuestros usuarios.<br /> ¡Te deseamos lo mejor en esta increíble aventura!</p>
            <h2>Registrarme</h2>
            <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column m-3">
              <label htmlFor="name">Nombre de usuario:</label>
              <input
                type="name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column m-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column m-3">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-outline-primary" type="submit">Registrarme</button>
            </form>
          <button onClick={onToggle} className="btn btn-outline-primary mt-3">Iniciar sesión</button>
          </div> 
    </div>

    </>
  )
}

export default Register;