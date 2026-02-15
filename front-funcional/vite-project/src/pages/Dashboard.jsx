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
    const [lista, setLista] = useState([]);
    const [listaa, setListaa] = useState(false);

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
            navigate('/panel/admin');
        } else if (usuario.user.role === "user") {
            console.log("Todo bien");
        }
    }, [navigate]);

    useEffect(() => { 
    const usuario = JSON.parse(localStorage.getItem('user'));
    if(usuario.user.role){
        setUserRole(usuario.user.role)
        }
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const id = user.user.id;

        fetch(`http://127.0.0.1:8000/api/anotador/${id}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            if(Array.isArray(data)){
                // setLista(data);

                // Obtener la fecha de hoy
                const today = new Date();

                // Filtrar fechas dentro de los próximos 5 días
                const filteredData = data.filter(item => {
                    const itemDate = new Date(item.fecha); // Convertir a objeto Date
                    const diffInDays = (itemDate - today) / (1000 * 60 * 60 * 24); // Diferencia en días
                    return diffInDays > 0 && diffInDays <= 5; // Entre hoy y 5 días adelante
                });

                // Mostrar el nuevo array en consola
                // console.log('Fechas dentro de los próximos 5 días:', filteredData);
                setLista(filteredData);
                // if(isEmpty(lista)){
                //     setListaa(true);
                // }

            } else {
                console.error('Unexpected API response:', data);
            }
        })
        .catch(error => console.error('Error fetching recuerdos:', error));
        }, []);
        useEffect(() => {
            console.log('Lista actualizada:', lista);
        }, [lista]);

        // Función para eliminar de la vista con un click
const eliminarRecordatorio = (id) => {
    // Filtramos la lista para quitar el elemento con ese ID
    const nuevaLista = lista.filter(item => item.id !== id);
    setLista(nuevaLista);
    
    // Opcional: Aquí podrías hacer un fetch a tu API con el método DELETE 
    // si quisieras borrarlo permanentemente de la base de datos.
};
        

    return(
        <div className="fondoDashboard vh-100">
        <div className="dashboard pt-5 text-center">

<div 
    className="position-fixed bottom-0 end-0 m-4 mb-5" 
    style={{ zIndex: 1050, maxWidth: '400px', width: '100%' }}
>
    <div className="container-fluid">
        <div 
            className="row row-cols-1 g-3" 
            style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '5px' }}
        >
            {lista.length > 0 ? (
                lista.map((item) => (
                    <div className="col" key={item.id}>
                        {/* Agregamos border-dark y un estilo para el grosor de 2px */}
                        <div 
                            className="card shadow-lg position-relative border-dark" 
                            style={{ borderStyle: 'solid', borderWidth: '1px' }}
                        >
                            <button 
                                type="button" 
                                className="btn-close position-absolute top-0 end-0 m-2" 
                                style={{ fontSize: '0.7rem' }}
                                aria-label="Close"
                                onClick={() => eliminarRecordatorio(item.id)}
                            ></button>

                            <div className="card-body">
                                <p className="card-text text-muted small mb-2">
                                    {item.nota}
                                </p>
                                <div className="d-flex align-items-center">
                                    <span className="badge rounded-pill bg-light text-primary border border-primary small">
                                        📅 {new Date(item.fecha).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : null}
        </div>
    </div>
</div>


            <div className="saludo">
            {/* <img src={img} width="100px" alt="" /> */}
            <h2 style={estiloTitulo}>¡Bienvenido a <span id="nat">Nat</span><span id="user">User</span>!</h2>
            <p>¡Nos alegra tenerte por acá!</p>
            </div>

            {/* {lista ? (
                <div class="alert alert-warning alert-dismissible fade show mx-1" role="alert">
                <strong>Falta menos de 5 dias para tus notas!</strong> 
                {lista.map((item, index) => (
                    <li key={index}>{item.nota}</li>
                ))}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
             ): (
                <div></div>
            )} */}
            
            <div className="funcionalidades p-4 mt-2 mx-1" style={estiloFondo}>
            <h2>Funcionalidades para usuarios</h2>
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

            <div className="agradecimiento mt-2 mx-1" style={estiloFondo}>
                 <p className="p-3">Gracias por ser parte de nuestra comunidad. ¡Estamos acá para apoyarte en cada paso del camino!</p>
             </div>
        </div>
        </div>
    );
}

export default Dashboard;