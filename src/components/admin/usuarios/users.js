import { useState } from "react";
import AuthUser from "../../auth/AuthUser"
import { NavLink } from "react-router-dom";
import Dashboard from "../../dashboard";
import { paginator,orderColumn,FetchData } from "../../helpers/fetchHelpers";

export default function Users() {
  const [details,setDetails] = useState('');
  FetchData('users',details,setDetails)
  const {fetch} = FetchData('users',details,setDetails)
  const {http} = AuthUser();
  const [searchForm,setSearchForm] = useState({
    params: "user:email", 
    search: "",
  });
  
  const handleChange = e => {
    const {value,name} = e.target
  
    setSearchForm({
        ...searchForm,
        [name]: value
    })
  
  }
  
  function renderData(){
    if (details) {
  
      return <div>
      
        <div className="row align-items-center">
          <div className="col-sm-2">
          Usuarios: {details.total}
          </div>
      
          <div className="col-sm-2">
            <label htmlFor="search" className="form-label"> <b className="ms-3"> Buscar:</b>
              <input name="search" id="search" className="form-control m-3"  onChange={(e)=>orderColumn('admin/search-users/'+e.target.value,searchForm,http,setDetails)}></input>
            </label>
          </div>

          <div className="col-sm-2">
          <label htmlFor="params" className="form-label"> <b className="ms-3"> Por:</b>
            <select className="form-select m-3" name="params" 
              onChange={handleChange}>
              <option value="user:email">Correo</option>
              <option value="user:nombre">Nombre Usuario</option>
              <option value="user:celular">Teléfono</option>

            </select>
          </label>
          </div>
          <div className="col-sm-2 mt-3">
          <NavLink className="btn btn-success btn-sm"  to={"/add-empleado/"} >Agregar Empleado</NavLink>
          </div>
        </div>
      <div className="table-responsive" id="table">
  <table className=" table table-info table-striped">
      <thead>
          <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre Usuario</th>
              <th scope="col">Correo</th>
              <th scope="col">Teléfono</th>
              <th>Usuario</th>
          </tr>
      </thead>
      <tbody>
      
      { Object.values(details?.data).map((elemento) => (
          <tr key={elemento.id}>
              <th scope="row">{elemento.id}</th>
              <td>{elemento.nombre +" "+ elemento.apaterno + " " + elemento.amaterno}</td>
              <td>{elemento.email }</td>
              <td>{elemento.celular}</td>
              <td><NavLink className="btn btn-primary btn-sm"  to={"/update-user/"+elemento.id} >Editar</NavLink></td>
          </tr>
          ))
      }
          
      </tbody>
      </table>  
      </div>
      <nav aria-label="...">
        <ul className="pagination">
        { paginator(details.links,fetch) }
        </ul>
      </nav>
    </div>
    }else{
      return <div className="spinner-border text-primary " role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
    }
  }
  
  return (
      <div className="justify-content-center">
        <Dashboard></Dashboard>
        { renderData() }
      </div>
    )
} 