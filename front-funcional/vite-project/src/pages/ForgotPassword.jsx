import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/password/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    setMensaje(data.message);
  };

  return (
    <div className="login d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="cardContenido p-5 border-dark" style={{border: '2px solid black'}}>
        <h2>Recuperar Contraseña</h2>
        <p className="small">Te enviaremos un enlace a tu correo.</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" className="form-control mb-3" placeholder="Email"
            onChange={(e) => setEmail(e.target.value)} required 
          />
          <button className="btn btn-outline-primary w-100">Enviar enlace</button>
        </form>
        {mensaje && <p className="mt-3 text-success small">{mensaje}</p>}
      </div>
    </div>
  );
}
export default ForgotPassword;