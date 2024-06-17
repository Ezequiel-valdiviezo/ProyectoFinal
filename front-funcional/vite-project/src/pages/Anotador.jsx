import React from "react";
import '../styles/anotador.css'

function Anotador(){

    return(
      <div className="anotador ">
        <h2 className="text-center mt-5">Bienvenido al anotador</h2>
        <p className="text-center">Desde acá vas a poder tener notas para lo que necesites, podes utilizarlo como lista de compras, de comidas, o lo que necesites.</p>

        <div className="m-auto" style={{ maxWidth: '900px', width: '100%' }}>
          <h3 className="text-center mt-5">Lista</h3>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              A second item
              <div>
                <button className="me-2 btn btn-primary">Terminado</button>
                <button className="btn btn-danger">Eliminar</button>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              A second item
              <div>
                <button className="me-2 btn btn-primary">Terminado</button>
                <button className="btn btn-danger">Eliminar</button>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              A second item
              <div>
                <button className="me-2 btn btn-primary">Terminado</button>
                <button className="btn btn-danger">Eliminar</button>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              A second item
              <div>
                <button className="me-2 btn btn-primary">Terminado</button>
                <button className="btn btn-danger">Eliminar</button>
              </div>
            </li>
          </ul>
        </div>

        <div className="m-auto" style={{ maxWidth: '900px', width: '100%' }}>
          <h3 className="text-center mt-5">Echas</h3>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              A second item
              <div>
                <button className="me-2 btn btn-primary">Terminado</button>
                <button className="btn btn-danger">Eliminar</button>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              A second item
              <div>
                <button className="me-2 btn btn-primary">Terminado</button>
                <button className="btn btn-danger">Eliminar</button>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              A second item
              <div>
                <button className="me-2 btn btn-primary">Terminado</button>
                <button className="btn btn-danger">Eliminar</button>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              A second item
              <div>
                <button className="me-2 btn btn-primary">Terminado</button>
                <button className="btn btn-danger">Eliminar</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
}

export default Anotador;