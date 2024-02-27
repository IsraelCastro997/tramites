import { useState } from "react";
import AuthUser from "../../auth/AuthUser"
import { NavLink } from "react-router-dom";
import Dashboard from "../../dashboard";
import { paginator, orderColumn, FetchData } from "../../helpers/fetchHelpers";

export default function SolicitudesEspera() {
  const [details, setDetails] = useState('');
  FetchData('/admin/get-solicitudes-espera', details, setDetails)
  const { fetch } = FetchData('/admin/get-solicitudes-espera', details, setDetails)
  const { http } = AuthUser();
  const [searchForm, setSearchForm] = useState({
    params: "user:email",
    search: "",
  });

  const handleChange = e => {
    const { value, name } = e.target

    setSearchForm({
      ...searchForm,
      [name]: value
    })
    console.log(searchForm);
  }

  function submitForm(request, validate) {

    http.post('/admin/validar-solicitud', { request, validate }).then((res) => {
      alert('Operación Exitosa')
      console.log(res.data)
      fetch('/admin/get-solicitudes-espera')
    })
  }

  function renderSolicitudes() {
    if (details) {

      return <div >

        <div className="row align-items-center">
          <div className="col-sm-2">
            Solicitudes: {details.total}
          </div>
          <div className="col-sm-2">
            <label htmlFor="search" className="form-label"> <b className="ms-3"> Buscar:</b>
              <input name="search" id="search" className="form-control m-3"
                onChange={(e) => orderColumn('/admin/search-solicitudes/4/' + e.target.value, searchForm, http, setDetails, fetch)}></input>
            </label>
          </div>

          <div className="col-sm-2">
            <label htmlFor="params" className="form-label"> <b className="ms-3"> Por:</b>
              <select className="form-select m-3" name="params"
                onChange={handleChange}>
                <option value="solicitud:email">Correo</option>
                <option value="infante:nombre">Nombre Infante</option>
                <option value="madre:celular">Teléfono</option>
                <option value="folio">folio</option>
              </select>
            </label>
          </div>
        </div>

        <div className="table-responsive" id="table">
          <table className="table table-info table-striped ">
            <thead>
              <tr>
                <th scope="col">#</th>
              
                <th scope="col">Nombre Infante</th>
                <th scope="col">Correo</th>
                <th >Teléfono</th>
                {/* <th> 
                 
                  <select className="form-select no-arrow form-select-lg" name="tipo_id" 
                  onChange={(e)=>{orderColumn('/admin/get-solicitudes/',e,http,setUsersDetails); e.target.value = ""}}>
                    <option value="">Tipo</option>
                    <option value="1">Guarderia</option>
                    <option value="2">Despensa</option>
                    <option value="3">tipo3</option>
                    <option value="4">Tipo4</option>
                  </select>
                </th> */}
                <th>Situación</th>
                <th>Solicitud</th>
                <th></th>

              </tr>
            </thead>
            <tbody>

              {Object.values(details?.data).map((elemento) => (
                <tr key={elemento.id}>
                  <th scope="row" >{elemento.id}</th>
                  <td style={{ minWidth: " 300px" }}>{elemento.infante ? elemento.infante?.nombre + " " + elemento.infante?.apaterno + " " + elemento.infante?.amaterno : null}</td>
                  <td style={{minWidth:" 150px"}}>{elemento.email}</td>
                  <td style={{minWidth:" 150px"}}>{elemento.madre?.celular}</td>
                  <td style={{ minWidth: " 300px" }}>{elemento.situacion?.descripcion}</td>
                  <td><NavLink className="btn btn-warning btn-sm" to={"/solicitud-" + elemento.tipo?.nombre + "/" + elemento.id} >Editar</NavLink></td>
                  <td><button className="btn btn-success btn-sm" onClick={() => { submitForm(elemento, 2) }} type="button">Aceptar </button> </td>
                </tr>
              ))
              }

            </tbody>
          </table>

        </div>
        <nav aria-label="...">
          <ul className="pagination">
            {paginator(details.links, fetch)}
          </ul>
        </nav>
      </div>
    } else {
      return <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    }
  }

  return (
    <div>
      <Dashboard></Dashboard>
      {renderSolicitudes()}
    </div>
  )
}
