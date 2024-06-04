import React, {useState} from "react";
import '../styles/register.css'
import imgg from '../assets/be.png'


function Register({ onToggle, onRegister }){

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Form data submitted:', formData);
    // Aquí puedes añadir la lógica para enviar los datos a un servidor o procesarlos de otra manera
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // if (!response.ok) {
      //   throw new Error('Error en el registro');
      // }
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error data:', errorData);
        setError(errorData);
        return;
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      // Asume que el registro fue exitoso y llama a onRegister para redirigir a Home
      onRegister();
      console.log("Proceso terminado");
    } catch (error) {
      console.error('Error:', error);
      setError('Hubo un problema con el registro. Intenta de nuevo.');
    }

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
              {error.name && <p style={{ color: 'red' }}>{error.name[0]}</p>}
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
              {error.email && <p style={{ color: 'red' }}>{error.email[0]}</p>}
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
               {error.password && <p style={{ color: 'red' }}>{error.password[0]}</p>}
            </div>
            {error.general && <p style={{ color: 'red' }}>{error.general}</p>}
            <button className="btn btn-outline-primary" type="submit">Registrarme</button>
            </form>
          <button onClick={onToggle} className="btn btn-outline-primary mt-3">Iniciar sesión</button>
          </div> 
    </div>

    </>
  )
}

export default Register;