import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useColorContext } from "../../context/colorContext";
import "../../styles/adminUsuarios.css";
import gif from "../../assets/gif/check.gif";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const modalRef = useRef(null);
  const [modalInstance, setModalInstance] = useState(null);
  const [msjEliminar, setMensajeEliminar] = useState("");
  const [loading, setLoading] = useState(false);
  const { colors, color } = useColorContext();
  const estiloTitulo = {
    color: color,
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // DataTables setup
  useEffect(() => {
    const $ = window.jQuery;
    if (usuarios.length > 0) {
      $(document).ready(function () {
        $("#usuariosTable").DataTable({
            language: {
              processing: "Procesando...",
              search: "Buscar:",
              lengthMenu: "Mostrar _MENU_ registros",
              info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
              infoEmpty: "Mostrando 0 a 0 de 0 registros",
              infoFiltered: "(filtrado de _MAX_ registros totales)",
              infoPostFix: "",
              loadingRecords: "Cargando...",
              zeroRecords: "No se encontraron registros coincidentes",
              emptyTable: "No hay datos disponibles en la tabla",
              paginate: {
                first: "Primero",
                previous: "Anterior",
                next: "Siguiente",
                last: "Último",
              },
              aria: {
                sortAscending: ": activar para ordenar la columna de manera ascendente",
                sortDescending: ": activar para ordenar la columna de manera descendente",
              },
            },
          });
      });

      // Cleanup: Destruir DataTables para evitar duplicados
      return () => {
        if ($.fn.DataTable.isDataTable("#usuariosTable")) {
          $("#usuariosTable").DataTable().destroy();
        }
      };
    }
  }, [usuarios]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("user"));
    if (!usuario) {
      navigate("/login");
    } else if (usuario.user.role === "admin") {
      console.log("Todo bien");
    } else if (usuario.user.role === "user") {
      navigate("/home");
    }
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/api/users", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetch usuarios:", error);
        setLoading(false);
      });
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
      const response = await fetch(
        `http://127.0.0.1:8000/api/user/${deleteId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      setMensajeEliminar(
        `<div className="alert alert-success d-flex align-items-center mt-5 mx-5" role="alert">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
          <div>
            <p>Eliminando...</p>
          </div>
        </div>`
      );

      if (response.ok) {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((usuario) => usuario.id !== deleteId)
        );
        setMensajeEliminar(
          `<div class="mt-3 d-flex justify-content-center">
            <img src="${gif}" width="28px" alt="">
            <p class="mx-2">Usuario eliminado correctamente</p>
          </div>`
        );
      } else {
        setMensajeEliminar(
          `<div class="mt-3 d-flex justify-content-center">
            <p class="mx-2">Error al eliminar usuario</p>
          </div>`
        );
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    } finally {
      if (modalInstance) {
        modalInstance.hide();
      }
      setDeleteId(null);
    }
  };

  return (
    <div className="vh-100">
      <div className="usuarios pt-5 text-center">
        <h2 style={estiloTitulo}>Usuarios</h2>
        <p
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: msjEliminar }}
        ></p>

        {loading ? (
          <div className="alert mt-5 mx-5" role="alert">
            <div className="spinner-border text-primary m-auto" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table
              id="usuariosTable"
              className="table table-striped table-hover text-start"
            >
              <thead className="table-dark">
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.email}</td>
                    <td>{usuario.name}</td>
                    <td>{usuario.role}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(usuario.id)}
                        className="btn btn-outline-danger"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Usuarios;
