import React, { useEffect, useState } from "react";
import '../styles/registrosMedicos.css'
import { useColorContext } from '../context/colorContext';

function RegistrosMedicos(){
    const [registro, setRegistro] = useState([]);
    const [estadoForm, setEstadoForm] = useState(false);
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

      const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData(); // Crea un objeto FormData para enviar datos de formulario y archivos
            formDataToSend.append('user_id', formData.user_id);
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

        } catch (error) {
            console.error('Error al enviar datos:', error);
            // Aquí podrías manejar el error, por ejemplo, mostrar un mensaje de error
        }
    };

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
            <form onSubmit={handleSubmit}>
                <label htmlFor="user_id">
                    User ID:
                    <input
                        type="text"
                        name="user_id"
                        id="user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label htmlFor="file_path">
                    File Path:
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
                </label>
                <br />
                <label htmlFor="descripcion">
                    Descripción:
                    <textarea
                        name="descripcion"
                        id="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        maxLength="256"
                        required
                    />
                </label>
                <br />
                <button className="btn btn-outline-primary" type="submit">Guardar</button>
                <button className="btn btn-outline-primary" onClick={handleCerrarForm}>Cancelar</button>
            </form>
            }


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
                                    <td><button className="btn btn-outline-primary">Responder</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

        </div>
        </>
    )
}

export default RegistrosMedicos;