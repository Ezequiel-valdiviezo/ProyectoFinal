import React, {useState} from "react";
import '../styles/login.css'
import imgg from '../assets/logo.png'

function Login({ onToggle, onLogin }){

  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data enviado:', formData);
    // Aquí puedes añadir la lógica para enviar los datos a un servidor o procesarlos de otra manera
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error en el logeo');
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      // Asume que el logeo fue exitoso y llama a onLogin para redirigir a Home
      onLogin();
      console.log("Proceso terminado");
    } catch (error) {
      console.error('Error:', error);
      setError('Hubo un problema con el logeo. Intenta de nuevo.');
    }
  };

  return(
    <div className="login d-flex flex-column justify-content-center align-items-center text-center vh-100">
      <div className="cardContenido p-5">
          <h1>¡Bienvenido a NatUser!</h1>
          {/* <img src={imgg} alt="" width="100px"/> */}
          {/* <p>¡Nos alegra tener aqui!</p> */}
          <p>Inicia sesión para acceder a contenido exclusivo, participar en foros y conectarte con otros padres que están viviendo la misma experiencia que tú.</p>
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
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
          <button className="btn btn-outline-primary" type="submit">Iniciar sesión</button>
          </form>
        <button onClick={onToggle} className="btn btn-outline-primary mt-3">Registro</button>
      </div>
    </div>
  )
}

export default Login;