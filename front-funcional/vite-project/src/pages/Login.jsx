import React, {useState} from "react";
import '../styles/login.css'
import imgg from '../assets/logo.png'
import ojoCerrado from '../assets/ojocerrado.png'
import ojoAbierto from '../assets/ojoabierto.png'
import { useNavigate } from "react-router-dom";

function Login({ onLogin }){

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    setLoading(true);
    console.log('Form data enviado:', formData);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
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
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      localStorage.setItem('user', JSON.stringify(data));
      const usuario = localStorage.getItem('user');

      // Asume que el logeo fue exitoso y llama a onLogin para redirigir a Home
      console.log("Proceso terminado");
      onLogin();
      // Redirige a la ruta /home
      navigate('/admin/panelAdmin');
      // if(usuario.role == "admin"){
      //   navigate('/admin')
      // }else{
      //   navigate('/home');
      // }
      
    } catch (error) {
      console.error('Error:', error);
      setError('Hubo un problema con el logeo. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return(
    <div className="login d-flex flex-column justify-content-center align-items-center text-center vh-100">
      <div className="cardContenido p-5">
          <h1>¡Bienvenido a <span id="nat">Nat</span><span id="user">User</span>!</h1>
          <p>Iniciá sesión para acceder a contenido exclusivo, participar en foros y conectarte con otros padres que están viviendo la misma experiencia.</p>
          <h2 className="fs-2">Iniciar sesión</h2>
          <form className="mb-2" onSubmit={handleSubmit}>
          <div className="d-flex flex-column m-3">
            <label className="text-start" htmlFor="email">Email</label>
            <input
              className="p-1"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nombre@gmail.com"
            />
          </div>
          <div className="d-flex flex-column m-3 position-relative">
            <label className="text-start" htmlFor="password">Contraseña</label>
            <div className="position-relative">
              <input
                className="p-1 w-100 pe-5"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <span 
                className="position-absolute end-0 top-50 translate-middle-y me-3 text-dark"
                style={{ cursor: "pointer", fontSize: "1.2rem" }}
                onClick={togglePasswordVisibility}
              ><img 
                  src={showPassword ? ojoAbierto : ojoCerrado} 
                  alt="visibilidad de contraseña" 
                  style={{ width: "20px"}}
                />
              </span>
            </div>
          </div>
          {loading && <div className="loader">
            {/* <p>Cargando...</p> */}
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="btn btn-outline-primary anchoBoton" type="submit">Iniciar sesión</button>
          </form>
        {/* <button onClick={onToggle} className="btn btn-outline-primary anchoBoton mt-2">Registro</button> */}
        <a href="/forgot-password" style={{fontSize: '0.9rem'}}>¿Olvidaste tu contraseña?</a> <br />
        <a href="./register">Registrarse</a>
      </div>
    </div>
  )
}

export default Login;