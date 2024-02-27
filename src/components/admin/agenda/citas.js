import { useState } from "react";
import AuthUser from '../../auth/AuthUser'
import { NavLink } from "react-router-dom";
import Dashboard from "../../dashboard";
import { paginator,FetchData } from "../../helpers/fetchHelpers";

export default function Citas() {
  const [details,setDetails] = useState('');
  const {http} = AuthUser();
  FetchData('citas',details,setDetails)
  const {fetch} = FetchData('citas',details,setDetails)
  
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
    console.log(searchForm);
  }
 
  async function statusAgenda(status,id){
    try {
     await http.post('/admin/agenda-confirm/',{status,id});
      alert('Actualizado correctamente')
      fetch('citas')
    }catch (error) {
      console.log(error);
    }
  }
    
  function renderData(){
    if (details) {

      return <div>
      <div className="row align-items-center">
        <div className="col-sm-2">
        Citas: {details.total}
        </div>

        <div className="col-sm-4">
          <label htmlFor="params" className="form-label"> <b className="ms-3"> Por:</b>
            <select className="form-select m-3" name="params" 
              onChange={handleChange}>
              <option value="user:email">Correo</option>
              {/* <option value="user:nombre">Nombre Usuario</option> */}
              <option value="user:celular">Teléfono</option>
            </select>
          </label>
        </div>

        <div className="col-sm-4">
          <p></p>
        </div>

      </div>
    
    <div className="table-responsive" id="table">
    <table className=" table table-info table-striped">
      <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Titulo </th>
            <th scope="col">Nombre infante </th>
            <th scope="col">Fecha</th>
            <th> Status </th>
            <th>Asistio</th>
            <th colSpan={3}></th>
          </tr>
      </thead>
      <tbody>
      { Object.values(details?.data).map((elemento) => (
        
        <tr key={elemento.id}>
          <th scope="row">{elemento.id}</th>
          <td>{elemento.title}</td>
          <td>{elemento.nombre_infante + " " + elemento.apaterno}</td>
          <td>{elemento.start }</td>
          <td>{elemento.status === 1 ? "confirmado" : elemento.status === 2 ? "No vino" : "Pendiente"}</td>
          <td className="d-flex flex-column">
            <button className="btn btn-success btn-sm" onClick={()=>{ statusAgenda(1,elemento.agenda_id)}}>Si</button>
            <button className="btn btn-danger btn-sm" onClick={()=>{ statusAgenda(2,elemento.agenda_id)}} >No</button>
          </td>
          <td>
            <NavLink className="btn btn-primary btn-sm" to={"/solicitud-"+elemento.nombre+"/"+elemento.id} >Solicitud</NavLink>
          </td>
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
      return <div className="spinner-border text-primary" role="status">
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
    