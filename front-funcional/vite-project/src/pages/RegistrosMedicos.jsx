import React, { useEffect, useState } from "react";
import '../styles/registrosMedicos.css'
import { useColorContext } from '../context/colorContext';
import { useNavigate } from "react-router-dom";

function RegistrosMedicos(){
    const [registro, setRegistro] = useState([]);
    const [estadoForm, setEstadoForm] = useState(false);
    const [registoCreado, setRegistroCreado] = useState('');
    const navigate = useNavigate();
    const { colors, color } = useColorContext();
    const estiloTitulo = {
        color: color,
      };
    const [formData, setFormData] = useState({
        user_id: '',
        file_path: null,
        descripcion: ''
    });

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
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.user.id;
    
        fetch(`http://127.0.0.1:8000/api/registroMedico/${userId}`, {
          method: 'GET',
          credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            setRegistro(data);
          } else {
            console.error('Unexpected API response:', data);
          }
        })
        .catch(error => console.error('Error fetching registros:', error));
      }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file_path') {
          setFormData({
            ...formData,
            file_path: files[0]
          });
        } else {
          setFormData({
            ...formData,
            [name]: value
          });
        }
      };

      const handleDescarga = async (id) => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/registroMedico/descargar/${id}`, {
              method: 'GET',
              credentials: "include"
          });
          if (!response.ok) {
            throw new Error('Error al descargar archivo');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const contentDisposition = response.headers.get('Content-Disposition');
        let fileName = 'descarga';

        if (contentDisposition) {
            const matches = /filename="([^"]+)"/.exec(contentDisposition);
            if (matches && matches[1]) {
                fileName = matches[1];
            }
        }

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); // Usar el nombre del archivo obtenido del servidor
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); // Libera el objeto URL después de su uso
      } catch (error) {
          console.error('Error:', error);
          // Aquí podrías manejar el error, por ejemplo, mostrar un mensaje de error
      }
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.user.id;
        
        const formDataToSend = new FormData(); // Crea un objeto FormData para enviar datos de formulario y archivos
            formDataToSend.append('user_id', userId);
            formDataToSend.append('file_path', formData.file_path);
            formDataToSend.append('descripcion', formData.descripcion);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/registroMedico', {
                method: 'POST',
                body: formDataToSend
            });

            if (!response.ok) {
                throw new Error('Error al enviar datos');
            }

            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            // Aquí podrías manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
            setRegistroCreado("Registro creado exitosamente");
            // Establecer un temporizador para vaciar el mensaje después de 5 segundos y recargar la página
            setTimeout(() => {
              setRegistroCreado(""); // Vacía el mensaje
              window.location.reload(); // Recarga la página
            }, 3000); // 5000 milisegundos = 5 segundos
        } catch (error) {
            console.error('Error al enviar datos:', error);
            // Aquí podrías manejar el error, por ejemplo, mostrar un mensaje de error
        }
    };

    const handleDelete = async (id) => {
      try {
          const response = await fetch(`http://127.0.0.1:8000/api/registroMedico/${id}`, {
              method: 'DELETE',
              credentials: 'include'
          });
          if(response.ok){
              console.log("Registro eliminado correctamente");
              // setMedicos(medicos.filter(medico => medico.id !== id));
          }else {
              console.error("Error al eliminar el médico")
          }
      } catch (error) {
          console.log("Error en la solicitus de eliminació", error);
      }
    }

    const handleAbrirForm = () => {
        setEstadoForm(true);
      };
    
      const handleCerrarForm = () => {
        setEstadoForm(false);
      };

    return(
        <>
        <div className="registrosMedicos">

            <h2 className="pt-5" style={estiloTitulo}>Registros médicos</h2>
            <p>Desde acá vas a poder cargar, eliminar y ver los registros médicos.</p>
            <button className="btn btn-outline-primary" onClick={handleAbrirForm}>Cargar registro médico</button>

            {estadoForm && 
            <form className="m-auto my-4 p-3" onSubmit={handleSubmit}>
              {registoCreado && 
              // <p className="text-center">{notaCreada}</p>
              <div className="alert alert-success d-flex align-items-center mt-5" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="0" height="24" role="img" aria-label="success:">
                        <use xlinkHref="#exclamation-triangle-fill" />
                    </svg>
                    <div>
                    {registoCreado}
                    </div>
                </div>
            }
                {/* <label htmlFor="user_id">
                    User ID:
                    <input
                        type="text"
                        name="user_id"
                        id="user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                        required
                    />
                </label> */}
                <br />
                <div className="form-group">
                <label htmlFor="file_path">Archivo:</label>
                    <input
                        type="file"
                        name="file_path"
                        id="file_path"
                        // value={formData.file_path}
                        // accept="image/*/pdf"
                        accept="image/jpeg,image/png,image/jpg,application/pdf" // Ajusta los tipos de archivo según tus necesidades
                        onChange={handleChange}
                        required
                    />
                  </div>
                <br />
                <div className="form-group">
                <label htmlFor="descripcion">Descripción:</label>
                    <textarea
                        name="descripcion"
                        id="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        maxLength="256"
                        required
                    />
                </div>
                <br />
                <div className="d-flex flex-wrap">
                  <button type="submit" className="btn btn-primary w-100 m-2">Guardar</button>
                  <button type="button" className="btn btn-primary w-100 m-2" onClick={handleCerrarForm}>Cancelar</button>
                </div>
            </form>
            }

            {/* {registoCreado && 
              // <p className="text-center">{notaCreada}</p>
              <div className="alert alert-success d-flex align-items-center mt-5" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="0" height="24" role="img" aria-label="success:">
                        <use xlinkHref="#exclamation-triangle-fill" />
                    </svg>
                    <div>
                    {registoCreado}
                    </div>
                </div>
            } */}


                  {registro.length > 0 ? (
                    <table className="mt-5 table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Archivo</th>
                                <th scope="col">Descripción</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {registro.map((regis, index) => (
                              <tr key={index}>
                                    <td>{regis.id}</td>
                                    <td>{regis.file_path}</td>
                                    <td>{regis.descripcion}</td>
                                    <td>
                                      <button className="btn btn-outline-primary" onClick={() => handleDescarga(regis.id)}>Descargar</button>
                                      <button className="btn btn-outline-danger" onClick={() => handleDelete(regis.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    ) : (
                      <p className="mt-5">No hay registros médicos</p>
                    )}

        </div>
        </>
    )
}

export default RegistrosMedicos;