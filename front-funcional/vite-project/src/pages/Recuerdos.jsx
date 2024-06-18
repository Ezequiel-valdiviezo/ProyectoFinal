import React, { useEffect, useState } from "react";

function Recuerdos() {
  const [recuerdos, setRecuerdos] = useState([]);
  const [formData, setFormData] = useState({
    imagen: null,
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

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/album', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        setRecuerdos(data);
      } else {
        console.error('Unexpected API response:', data);
      }
    })
    .catch(error => console.error('Error fetching recuerdos:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/album/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        setRecuerdos(recuerdos.filter(recuerdo => recuerdo.id !== id));
      } else {
        console.error('Error al eliminar el recuerdo');
      }
    } catch (error) {
      console.error('Error en la solicitud de eliminación:', error);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('imagen', formData.imagen);
    formDataToSend.append('descripcion', formData.descripcion);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/album', {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend
      });

      if (response.ok) {
        const data = await response.json();
        setRecuerdos([...recuerdos, data]);
        console.log('Recuerdo guardado exitosamente');
      } else {
        console.error('Error al guardar el recuerdo');
      }
    } catch (error) {
      console.error('Error en la solicitud de guardado:', error);
    }
  };

  return (
    <>
      <h2>Álbum de recuerdos</h2>
      <p>Desde aquí vas poder cargar, eliminar y ver los recuerdos más significativos para vos.</p>

      <form onSubmit={handleForm}>
        <div className="form-group">
          <label htmlFor="imagen">Imagen</label>
          <input
            type="file"
            className="form-control"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            rows="3"
            value={formData.descripcion}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Enviar</button>
      </form>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {recuerdos.map((recuerdo) => (
              <div className="col" key={recuerdo.id}>
                <div className="card shadow-sm">
                  <img
                    className="bd-placeholder-img card-img-top"
                    width="100%"
                    height="225"
                    src={recuerdo.imagen_url} // Asumiendo que el URL de la imagen se llama imagen_url
                    alt="Recuerdo"
                  />
                  <div className="card-body">
                    <p className="card-text">{recuerdo.descripcion}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button type="button" className="btn btn-primary">Ver</button>
                        <button onClick={() => handleDelete(recuerdo.id)} type="button" className="btn btn-danger">Eliminar</button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Recuerdos;
