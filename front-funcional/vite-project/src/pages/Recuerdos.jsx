import React, { useEffect, useState, useRef } from "react";
import '../styles/recuerdo.css';
import { useColorContext } from '../context/colorContext';

function Recuerdos() {
  const [recuerdos, setRecuerdos] = useState([]);
  const [estadoForm, setEstadoForm] = useState(false);
  const [formData, setFormData] = useState({
    user_id: '',
    imagen: null,
    imagen2: null,
    imagen3: null,
    descripcion: ''
  });
  const [deleteId, setDeleteId] = useState(null);
  const [recuerdoSeleccionado, setRecuerdoSeleccionado] = useState(null);
  const modalRef = useRef(null);
  const [modalInstance, setModalInstance] = useState(null);
  const { colors, color } = useColorContext();
  const estiloTitulo = {
      color: color,
    };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.user.id;

    fetch(`http://127.0.0.1:8000/api/album/${userId}`, {
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

  useEffect(() => {
    if (modalRef.current) {
      const modal = new window.bootstrap.Modal(modalRef.current);
      setModalInstance(modal);
    }
  }, [modalRef]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setFormData({
        ...formData,
        imagen: files[0]
      });
    } else if (name === 'imagen2') {
      setFormData({
        ...formData,
        imagen2: files[0]
      });
    } else if (name === 'imagen3') {
      setFormData({
        ...formData,
        imagen3: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    if (modalInstance) {
      modalInstance.show();
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/album/${deleteId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        setRecuerdos(recuerdos.filter(recuerdo => recuerdo.id !== deleteId));
        console.log('Recuerdo eliminado correctamente');
      } else {
        console.error('Error al eliminar el recuerdo');
      }
    } catch (error) {
      console.error('Error en la solicitud de eliminación:', error);
    } finally {
      if (modalInstance) {
        modalInstance.hide();
      }
      setDeleteId(null);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    const formDataToSend = new FormData();
    formDataToSend.append('user_id', user.user.id);
    formDataToSend.append('imagen', formData.imagen);
    formDataToSend.append('imagen2', formData.imagen2);
    formDataToSend.append('imagen3', formData.imagen3);
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

  const handleAbrirForm = () => {
    setEstadoForm(true);
  };

  const handleCerrarForm = () => {
    setEstadoForm(false);
  };

  const handleVerRecuerdo = (recuerdo) => {
    setRecuerdoSeleccionado(recuerdo);
  };

  const handleCerrarRecuerdo = () => {
    setRecuerdoSeleccionado(null);
  };

  return (
    <div className="fondoRecuerdos">
      <div className="recuerdos text-center">
        <h2 className="pt-5" style={estiloTitulo}>Álbum de recuerdos</h2>
        <p>Desde acá vas a poder cargar, eliminar y ver los recuerdos más significativos para vos.</p>
        <button className="btn btn-outline-primary" onClick={handleAbrirForm}>Cargar recuerdo</button>

        {estadoForm && 
          <form className="m-auto my-4 p-3" onSubmit={handleForm}>
            <div className="form-group">
              <label htmlFor="imagen">Imagen</label>
              <input
                type="file"
                className="form-control mt-2"
                id="imagen"
                name="imagen"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="imagen2">Imagen 2</label>
              <input
                type="file"
                className="form-control mt-2"
                id="imagen2"
                name="imagen2"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="imagen3">Imagen 3</label>
              <input
                type="file"
                className="form-control mt-2"
                id="imagen3"
                name="imagen3"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                className="form-control mt-2"
                id="descripcion"
                name="descripcion"
                rows="3"
                value={formData.descripcion}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="d-flex flex-wrap">
              <button type="submit" className="btn btn-primary w-100 m-2">Enviar</button>
              <button type="button" className="btn btn-primary w-100 m-2" onClick={handleCerrarForm}>Cancelar</button>
            </div>
          </form>
        }

        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {recuerdos.map((recuerdo) => (
                <div className="col" key={recuerdo.id}>
                  <div className="card shadow-sm">
                    <img
                      className="bd-placeholder-img card-img-top"
                      style={{ objectFit: 'cover', height: '300px' }}
                      src={'http://127.0.0.1:8000/' + recuerdo.imagen}
                      alt="Recuerdo"
                    />
                    <div className="card-body">
                      <p className="card-text">{recuerdo.descripcion}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button type="button" className="btn btn-primary" onClick={() => handleVerRecuerdo(recuerdo)}>Ver</button>
                          <button onClick={() => handleDelete(recuerdo.id)} type="button" className="btn btn-danger">Eliminar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal para ver el recuerdo */}
        {recuerdoSeleccionado && (
          <div className="modal show" style={{ display: "block" }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{recuerdoSeleccionado.descripcion}</h5>
                  <button type="button" className="btn-close" onClick={handleCerrarRecuerdo}></button>
                </div>
                  <div className="modal-body">
                    {recuerdoSeleccionado.imagen2 || recuerdoSeleccionado.imagen3 ? (
                      <div id={`carousel${recuerdoSeleccionado.id}`} className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                          <div className="carousel-item active">
                            <img
                              className="img-fluid"
                              src={'http://127.0.0.1:8000/' + recuerdoSeleccionado.imagen}
                              alt="Recuerdo"
                            />
                          </div>
                          {recuerdoSeleccionado.imagen2 && (
                            <div className="carousel-item">
                              <img
                                className="img-fluid"
                                src={'http://127.0.0.1:8000/' + recuerdoSeleccionado.imagen2}
                                alt="Recuerdo"
                              />
                            </div>
                          )}
                          {recuerdoSeleccionado.imagen3 && (
                            <div className="carousel-item">
                              <img
                                className="img-fluid"
                                src={'http://127.0.0.1:8000/' + recuerdoSeleccionado.imagen3}
                                alt="Recuerdo"
                              />
                            </div>
                          )}
                        </div>
                        <button className="carousel-control-prev custom-carousel-control-prev" type="button" data-bs-target={`#carousel${recuerdoSeleccionado.id}`} data-bs-slide="prev">
                          <span className="carousel-control-prev-icon custom-carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next custom-carousel-control-next" type="button" data-bs-target={`#carousel${recuerdoSeleccionado.id}`} data-bs-slide="next">
                          <span className="carousel-control-next-icon custom-carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </div>
                    ) : (
                      <img
                        className="img-fluid"
                        src={'http://127.0.0.1:8000/' + recuerdoSeleccionado.imagen}
                        alt="Recuerdo"
                      />
                    )}
                  </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCerrarRecuerdo}>Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal para confirmar eliminación */}
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" ref={modalRef}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Confirmar eliminación</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                ¿Estás seguro de eliminar este recuerdo?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recuerdos;
