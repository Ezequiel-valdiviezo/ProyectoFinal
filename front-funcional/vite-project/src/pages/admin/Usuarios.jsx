import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useColorContext } from '../../context/colorContext';
import '../../styles/adminUsuarios.css'
import gif from '../../assets/gif/check.gif'


function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    const [deleteId, setDeleteId] = useState(null);
    const modalRef = useRef(null);
    const [modalInstance, setModalInstance] = useState(null);

    const [msjEliminar, setMensajeEliminar] = useState('');

    const { colors, color } = useColorContext();
    const estiloTitulo = {
        color: color,
    };

    //Guarda la pagina actual
    const [currentPage, setCurrentPage] = useState(1);
    //elementos a mostrar por pagina
    const [itemsPerPage] = useState(5);

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
        fetch('http://127.0.0.1:8000/api/users', {
            method: 'GET',
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => setUsuarios(data))
            .catch(error => console.error('Error fetch cursos:', error));
    }, []);

    useEffect(() => {
        if (modalRef.current) {
            const modal = new bootstrap.Modal(modalRef.current);
            setModalInstance(modal);
        }
    }, [modalRef]);

    const handleDelete = (id) => {
        setDeleteId(id);
        if (modalInstance) {
            modalInstance.show();
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/user/${deleteId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            setMensajeEliminar(` <div className="alert alert-success d-flex align-items-center mt-5 mx-5" role="alert">
                                      <div class="spinner-border text-primary" role="status">
                                        <span class="visually-hidden">Cargando...</span>
                                      </div>
                                      <div>
                                       <p>Eliminando...</p>
                                      </div>
                                  </div>`);

            if (response.ok) {
                setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.id !== deleteId));
                console.log('Usuario eliminado correctamente');
                setMensajeEliminar(`<div class="mt-3 d-flex justify-content-center justify-content-center">
                    <div>
                      <img src="${gif}" width="28px" alt="">
                    </div>
                    <div>
                      <p class="mx-2">Usuario eliminado correctamente</p>
                    </div>
                  </div> `);
            } else {
                console.error('Error al eliminar el usuario');
                setMensajeEliminar(`<div class="mt-3 d-flex justify-content-center justify-content-center">
                    <div>
                      <img src="${gif}" width="28px" alt="">
                    </div>
                    <div>
                      <p class="mx-2">Error al eliminar usuario</p>
                    </div>
                  </div> `);
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

    // Calculan los indices de los elementos a mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Contiene los elementos de la página actual
    const currentItems = Array.isArray(usuarios) ? usuarios.slice(indexOfFirstItem, indexOfLastItem) : [];

    // Cambia la pagina al numero seleccionado
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="vh-100">
                <div className="usuarios pt-5 text-center">
                    <div className="saludo">
                        {/* <img src={img} width="100px" alt="" /> */}
                        <h2 style={estiloTitulo}>Usuarios</h2>
                    </div>

                    <p className="mt-4" dangerouslySetInnerHTML={{ __html: msjEliminar }}></p>

                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Rol</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.name}</td>
                                    <td>{usuario.role}</td>
                                    <td>
                                        <button onClick={() => handleDelete(usuario.id)} className="btn btn-outline-danger">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>Anterior</a>
                            </li>
                            {[...Array(Math.ceil(usuarios.length / itemsPerPage)).keys()].map(number => (
                                <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                                    <a className="page-link" href="#" onClick={() => paginate(number + 1)}>
                                        {number + 1}
                                    </a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === Math.ceil(usuarios.length / itemsPerPage) ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Siguiente</a>
                            </li>
                        </ul>
                    </nav>

                    {/* Modal para confirmar eliminación */}
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" ref={modalRef}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Confirmar eliminación</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    ¿Estás seguro de eliminar este usuario?
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
        </>
    );
}

export default Usuarios;
