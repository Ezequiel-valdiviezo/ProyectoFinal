import React, {useState} from "react";
import '../styles/register.css'
import imgg from '../assets/be.png'
import { useNavigate } from "react-router-dom";



function Register({ onRegister }){

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    password: '',
    password_confirmation: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onToggle = (e) => {
    navigate('/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log('Form data submitted:', formData);
    // Aquí puedes añadir la lógica para enviar los datos a un servidor o procesarlos de otra manera
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/register', {
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
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      // Asume que el registro fue exitoso y llama a onRegister para redirigir a Home
      onRegister();
      console.log("Proceso terminado");
      // Redirige a la ruta /home
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      setError('Hubo un problema con el registro. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }

  };

  return(
    <>
    <div className="register d-flex flex-column justify-content-center align-items-center text-center vh-100">
      <div className="cardContenido px-5 py-4">
        <h2>¡Bienvenido a <span id="nat">Nat</span><span id="user">User</span>!</h2>
            <p>Registrate y accedé a todas las funcionalidad.<br /> ¡Te deseamos lo mejor en esta increíble aventura!</p>
            <h2 className="fs-2">Registrarme</h2>
            <form className="mb-2" onSubmit={handleSubmit}>
            <div className="d-flex flex-column m-3">
              <label className="text-start" htmlFor="name">Nombre de usuario</label>
              <input
                className="p-1"
                type="name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="natuser"
              />
              {error.name && <p style={{ color: 'red' }}>{error.name[0]}</p>}
            </div>
            <div className="d-flex flex-column m-3">
              <label className="text-start" htmlFor="email">Email</label>
              <input
                className="p-1"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="natuser@gmail.com"
              />
              {error.email && <p style={{ color: 'red' }}>{error.email[0]}</p>}
            </div>
            <div className="d-flex flex-column m-3">
              <label className="text-start" htmlFor="password">Contraseña</label>
              <input
                className="p-1"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column m-3">
              <label className="text-start" htmlFor="password">Confirmar contraseña</label>
              <input
                className="p-1"
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                // placeholder="Confirm Password"
              />
               {error.password && <p style={{ color: 'red' }}>{error.password[0]}</p>}
            </div>
            {error.general && <p style={{ color: 'red' }}>{error.general}</p>}
            
            {loading && <div className="loader">
            {/* <p>Cargando...</p> */}
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
            </div>}

            <button className="btn btn-outline-primary anchoBoton" type="submit">Registrarme</button>
            </form>
          {/* <button onClick={onToggle} className="btn btn-outline-primary anchoBoton mt-2">Iniciar sesión</button> */}
          <a href="./login">Iniciar sesión</a>

          </div> 
    </div>

    </>
  )
}

export default Register;