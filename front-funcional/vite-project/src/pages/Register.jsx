import React, {useState} from "react";
import '../styles/register.css'

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
    <div className="login d-flex flex-column justify-content-center align-items-center text-center vh-100">
      <div className="cardContenido">
      <h1>¡Bienvenido a NatUser!</h1>
      <p>Si eres nuevo crea tu usuario por primera vez</p>

      <form onSubmit={handleSubmit}>
      <div className="d-flex flex-column m-3">
        <label htmlFor="name">Nombre:</label>
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
      <button className="btn btn-outline-primary" type="submit">Registrarse</button>
    </form>
    <button className="btn btn-outline-primary mt-3" onClick={onToggle}>Iniciar sesión</button>
    </div>
    </div>

    </>
  )
}

export default Register;