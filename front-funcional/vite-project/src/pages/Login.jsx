import React, {useState} from "react";
import '../styles/login.css'
import imgg from '../assets/logo.png'
import { useNavigate } from "react-router-dom";

function Login({ onLogin }){

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onToggle = (e) => {
    navigate('/register')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data enviado:', formData);
    // Aquí puedes añadir la lógica para enviar los datos a un servidor o procesarlos de otra manera
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // if (!response.ok) {
      //   throw new Error('Error en el logeo');
      // }
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error data:', errorData); // Debugging
        if (response.status === 401) {
          setError('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
        } else {
          setError('Hubo un problema con el logeo. Intenta de nuevo.');
        }
        return;
      }
      
      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      // Asume que el logeo fue exitoso y llama a onLogin para redirigir a Home
      console.log("Proceso terminado");
      onLogin();
      // Redirige a la ruta /home
      navigate('/home');
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
          <p>Inicia sesión para acceder a contenido exclusivo, participar en foros y conectarte con otros padres que están viviendo la misma experiencia.</p>
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="btn btn-outline-primary" type="submit">Iniciar sesión</button>
          </form>
        <button onClick={onToggle} className="btn btn-outline-primary mt-3">Registro</button>
      </div>
    </div>
  )
}

export default Login;