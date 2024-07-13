import React, { useState } from "react";
import '../styles/registrosMedicos.css'
import { useColorContext } from '../context/colorContext';

function RegistrosMedicos(){
    const { colors, color } = useColorContext();
    const estiloTitulo = {
        color: color,
      };
    const [formData, setFormData] = useState({
        user_id: '',
        file_path: '',
        descripcion: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'imagen') {
          setFormData({
            ...formData,
            imagen: files[0]
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

        try {
            const response = await fetch('http://127.0.0.1:8000/api/registroMedico', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
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

    return(
        <>
        <div className="registrosMedicos">

            <h2 className="pt-5" style={estiloTitulo}>Registros médicos</h2>
            <p>Desde acá vas a poder cargar, eliminar y ver los registros médicos.</p>
            <button className="btn btn-outline-primary" >Cargar registro médico</button>


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
                <label htmlFor="imagen">
                    File Path:
                    <input
                        type="file"
                        name="imagen"
                        id="imagen"
                        // value={formData.file_path}
                        accept="image/*"
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
                <button type="submit">Guardar</button>
            </form>

        </div>
        </>
    )
}

export default RegistrosMedicos;