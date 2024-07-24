import React, {useEffect, useState} from "react";
import '../styles/dashboard.css'
import icono1 from '../assets/icono1.png'
import album from '../assets/album.png'
import icono3 from '../assets/icono3.png'
import icono4 from '../assets/icono4.png'
import saludo from '../assets/ez.png'
import img from '../assets/logo.png'
import { useColorContext } from '../context/colorContext';
import { useNavigate } from "react-router-dom";


function Dashboard(){
    const [userRole, setUserRole] = useState(null);
    const { colors, color } = useColorContext();
    const navigate = useNavigate();
    const estiloTitulo = {
        color: color,
      };
    const estiloFondo = {
        background: color,
      };

      useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('user'));
        if (!usuario) {
            navigate('/login');
        } else if (usuario.user.role === "admin") {
            console.log("Todo bien");
        } else if (usuario.user.role === "user") {
            navigate('/home');
        }
    }, [navigate]);

    useEffect(() => { 
    const usuario = JSON.parse(localStorage.getItem('user'));
    if(usuario.user.role){
        setUserRole(usuario.user.role)
        }
    }, []);


    

const [email, setEmail] = useState('');
const [message, setMessage] = useState('');

const handleSubmitEmail = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://127.0.0.1:8000/api/enviar-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    if (response.ok) {
        setMessage('Email enviado con éxito');
    } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
    }
} catch (error) {
    setMessage('Hubo un error al enviar el email');
}
};


    return(
        <div className="fondoDashboard vh-100">
        <div className="dashboard pt-5 text-center">



        <form onSubmit={handleSubmitEmail}>
            <label>
                Dirección de Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Enviar Email</button>
            <p>{message}</p>
        </form>



            <div className="saludo">
            {/* <img src={img} width="100px" alt="" /> */}
            <h2 style={estiloTitulo}>¡Bienvenido a <span id="nat">Nat</span><span id="user">User</span>!</h2>
            <p>¡Nos alegra tenerte por acá!</p>
            </div>
            
            <div className="funcionalidades p-4 mt-2" style={estiloFondo}>
            <h2>Funcionalidades para Usuarios</h2>
            <p>Como usuario registrado, tenés acceso a una variedad de herramientas diseñadas para facilitarte la vida como padre primerizo:</p>
        
            <div className="d-flex flex-wrap justify-content-center align-items-center mt-4">
                <div className="col-md-3 col-sm-6 col-12 funcMini pt-2">
                    <img src={icono1} width="50px" alt="" />
                    <p>Acceso a expertos en pediatría</p>
                </div>
                <div className="col-md-3 col-sm-6 col-12 funcMini pt-2">
                    <img src={album} width="50px" alt="" />
                    <p>Anotador y cursos</p>
                </div>
                <div className="col-md-3 col-sm-6 col-12 funcMini pt-2">
                    <img src={icono3} width="50px" alt="" />
                    <p>Foro de padres</p>
                </div>
                <div className="col-md-3 col-sm-6 col-12 funcMini pt-2">
                    <img src={icono4} width="50px" alt="" />
                    <p>Álbum de recuerdos</p>
                </div>
            </div>
            </div>

            <div className="agradecimiento mt-2" style={estiloFondo}>
                 <p className="p-3">Gracias por ser parte de nuestra comunidad. ¡Estamos acá para apoyarte en cada paso del camino!</p>
             </div>
        </div>
        </div>
    );
}

export default Dashboard;