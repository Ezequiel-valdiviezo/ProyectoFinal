import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Extraemos los datos que Laravel puso en la URL
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/password/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token, email, password, password_confirmation
      })
    });

    if (response.ok) {
      alert("Contraseña actualizada. Ahora podés iniciar sesión.");
      navigate('/login');
    } else {
      setError("Hubo un error. El enlace puede haber expirado.");
    }
  };

  return (
    <div className="login d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="cardContenido p-5 border-dark" style={{border: '2px solid black'}}>
        <h2>Nueva Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="password" placeholder="Nueva Contraseña" 
            className="form-control mb-2" onChange={(e) => setPassword(e.target.value)}
          />
          <input 
            type="password" placeholder="Confirmar Contraseña" 
            className="form-control mb-3" onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <button className="btn btn-primary w-100">Cambiar Contraseña</button>
        </form>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </div>
  );
}
export default ResetPassword;