import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import AuthUser from "../../auth/AuthUser"
import Dashboard from "../../dashboard";
import { paginator,FetchData } from "../../helpers/fetchHelpers";

export default function InfantesSalaGuarderia() {
    let {id} = useParams(); 
    const [guarderiasDetails,setGuarderiasDetails] = useState('');
    FetchData('/admin/infantes-sala-guarderia/'+id,guarderiasDetails,setGuarderiasDetails)
    const {fetch} = FetchData('/admin/infantes-sala-guarderia/'+id,guarderiasDetails,setGuarderiasDetails)
    const {http} = AuthUser();
  
    // function submitForm(e){
    //     http.post('/admin/guarderia-status',e).then((res)=>{
     
    //      fetch('/admin/infantes-sala-guarderia')
    //   })
    // }
    
    function renderguarderias(){
      if (guarderiasDetails) {
    
       return <div className="table-responsive">
    <table className=" table table-info table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Madre</th>
                <th scope="col">Teléfono</th>
                
            </tr>
        </thead>
        <tbody>
        
        {Object.values(guarderiasDetails.data).map((elemento) => (
            <tr key={elemento.id}>
                <th scope="row">{elemento.id}</th>
                <td>{elemento.infante?.nombre} {elemento.infante?.apaterno} {elemento.infante?.amaterno}</td>
                <td>{elemento.madre?.nombre} {elemento.madre?.apaterno} {elemento.madre?.amaterno}</td>
                <td>{elemento.madre?.celular}</td>
                {/* <td>{elemento.responsable}</td>
                <td>{elemento.active === 1 ? "Activa" : "Inactiva"}</td> */}
                {/* <td><NavLink className="btn btn-warning btn-sm"  to={"/salas-guarderia/"+elemento.id} >Ver</NavLink></td>
                <td><NavLink className="btn btn-primary btn-sm"  to={"/guarderia-edit/"+elemento.id} >Editar</NavLink></td> */}
                
                {/* <td>
               {elemento.active === 0 ? <button className="btn btn-success btn-sm" onClick={()=> {submitForm(elemento)}}  type="button"> Activar </button> : <button className="btn btn-danger btn-sm" onClick={()=> {submitForm(elemento)}}  type="button"> Desactivar </button>  } </td> */}
               
            </tr>
            ))
        }
            
        </tbody>
        </table>  
        <nav aria-label="...">
          <ul className="pagination">
          
          { paginator(guarderiasDetails.links,fetch)}
          
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
      <div>
        <NavLink className="btn btn-success btn-sm mb-3 " to={"/agregar-guarderia"} >Agregar guarderia</NavLink>
        <div className="d-flex justify-content-center">
          <Dashboard></Dashboard>
       

          { renderguarderias()}
        </div>
      </div>
     
      )
    }
    
    