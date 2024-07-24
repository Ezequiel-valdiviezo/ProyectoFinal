import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useColorContext } from '../../context/colorContext';
import '../../styles/adminUsuarios.css'

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    const [deleteId, setDeleteId] = useState(null);
    const modalRef = useRef(null);
    const [modalInstance, setModalInstance] = useState(null);

    const { colors, color } = useColorContext();
    const estiloTitulo = {
        color: color,
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

            if (response.ok) {
                setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.id !== deleteId));
                console.log('Usuario eliminado correctamente');
            } else {
                console.error('Error al eliminar el usuario');
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

    return (
        <>
            <div className="vh-100">
                <div className="usuarios pt-5 text-center">
                    <div className="saludo">
                        {/* <img src={img} width="100px" alt="" /> */}
                        <h2 style={estiloTitulo}>Usuarios</h2>
                    </div>

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
                            {usuarios.map((usuario) => (
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
