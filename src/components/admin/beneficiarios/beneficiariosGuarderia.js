import { useState } from "react";
import AuthUser from "../../auth/AuthUser"
import { NavLink } from "react-router-dom";
import Dashboard from "../../dashboard";
import { paginator,orderColumn,FetchData } from "../../helpers/fetchHelpers";

export default function BeneficiariosGuarderia() {
  const [details,setDetails] = useState('');
  FetchData('/admin/beneficiarios-guarderias',details,setDetails)
  const {fetch} = FetchData('/admin/beneficiarios-guarderias',details,setDetails)
  
  const [searchForm,setSearchForm] = useState({
    params: "user:email", 
    search: "",
  });

  const {http} = AuthUser();
  function submitForm(e){
      http.post('/admin/beneficiario-status',e).then((res)=>{  
        console.log(res.data);
      fetch('/admin/beneficiarios-guarderias')
    })
  }

  const handleChange = e => {
    const {value,name} = e.target
    console.log(value + " " + name)
    setSearchForm({
        ...searchForm,
        [name]: value
    })
    console.log(searchForm);
  }

function renderSolicitudes(){
  if (details) {

   return <div>
   
   <div className="row align-items-center">
    <div className="col-sm-2">
      Beneficiarios: {details.total}
    </div>

    <div className="col-sm-2">
      <label htmlFor="search" className="form-label"> <b className="ms-3"> Buscar:</b>
        <input name="search" id="search" className="form-control m-3"  onChange={(e)=>orderColumn('admin/search-beneficiarios/'+e.target.value,searchForm,http,setDetails,fetch)}></input>
      </label>
    </div>

    <div className="col-sm-2">
      <label htmlFor="params" className="form-label"> <b className="ms-3"> Por:</b>
        <select className="form-select m-3" name="params" 
          onChange={handleChange}>
          <option value="solicitud:email">Correo</option>
          <option value="infante:nombre">Nombre Infante</option>
          <option value="madre:celular">Teléfono</option>
          <option value="solicitud:id">folio</option>
        </select>
      </label>
    </div>
  </div>
   
  <div className="table-responsive">
    <table className=" table table-info table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          {/* <th scope="col">Nombre Usuario</th> */}
          <th scope="col">Nombre Infante</th>
          <th scope="col">Correo</th>
          <th scope="col">Teléfono</th>
          {details.data[0]?.sala_g?.capacidad ? <th>  
            <select className="form-select no-arrow form-select-lg" name="guarderia_id"
            onChange={(e)=>{orderColumn('/admin/beneficiarios-guarderias/',e,http,setDetails); (e.target.value = "")}}>
              <option value="">Guarderia</option>
              <option value="1">CDI 01</option>
              <option value="2">CDI 02</option>
              <option value="3">CDI 03</option>
              <option value="4">CDI 04</option>
              <option value="5">CDI 05</option>
              <option value="6">CDI 06</option>
              <option value="7">CDI 08</option>
              <option value="8">CDI 09</option>
              <option value="9">CDI 10</option>
              <option value="10">CAIC 01</option>
              <option value="11">CAIC 02</option>
              <option value="12">CAIC 03</option>
              <option value="13">CAIC 05</option>
            </select>
          </th> : null}
            
          <th> 
            <select className="form-select no-arrow form-select-lg" name="status"
            onChange={(e)=>{orderColumn('/admin/beneficiarios-guarderias/',e,http,setDetails); (e.target.value = "")}}>
              <option value="">Status</option>
              <option value="5">Activo</option>
              <option value="6">Inactivo</option>
            </select>
        
          </th>
          <th>Situación</th>
          <th>Solicitud</th>
          <th>Infante</th>
        </tr>
      </thead>

      <tbody>
      
      {Object.values(details.data).map((elemento) => (
        <tr key={elemento.id}>
          <th scope="row">{elemento.id}</th>
          {/* <td>{elemento.user.nombre +" "+ elemento.user.apaterno+ " " + elemento.user.amaterno}</td> */}
          <td>{elemento.infante.nombre+" " + elemento.infante.apaterno+" " + elemento.infante.amaterno }</td>
          <td>{elemento.email }</td>
          <td>{elemento.madre?.celular}</td>
          {elemento.sala_g?.capacidad ?  <td>{elemento.sala_g.capacidad.guarderia.centro}</td> : null}
          
          <td>
          {elemento.sala_g.status === 5 ? <button className="btn btn-success btn-sm" onClick={()=> {submitForm(elemento)}}  type="button">{elemento.sala_g.estado.nombre} </button> : <button className="btn btn-danger btn-sm" onClick={()=> {submitForm(elemento)}}  type="button"> {elemento.sala_g.estado?.nombre} </button>  }
          </td>

          <td style={{minWidth: "300px"}}>{elemento.situacion?.descripcion}</td>
          <td><NavLink className="btn btn-warning btn-sm"  to={"/solicitud-"+elemento.tipo.nombre+"/"+elemento.id} >Editar</NavLink></td>
          <td><NavLink className="btn btn-info btn-sm"  to={"/sala-infante/"+elemento.id } >Editar</NavLink></td>
        </tr>
        ))
      }
          
      </tbody>
    </table>  
   
   </div>
    <nav aria-label="...">
      <ul className="pagination">
      { paginator(details.links, fetch) }
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
      { renderSolicitudes() }
    </div>
  )
}


