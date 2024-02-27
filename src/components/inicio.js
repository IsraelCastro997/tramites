import React, { useState } from 'react'
import AuthUser from './auth/AuthUser';
import { paginator,FetchData} from "./helpers/fetchHelpers";

function Inicio() {
  const [details,setDetails] = useState('');
  const {http} = AuthUser();
  const [message,setMessage] = useState(null);
  const [searchForm,setSearchForm] = useState({
    curp:"", 
    email:"",
  });

  const handleChange = e => {
    const {value,name} = e.target
  
    setSearchForm({
      ...searchForm,
      [name]: value
    })
  }

  async function handleSubmit(e){
    e.preventDefault()
    const res = await http.post('searchInHome',searchForm)
    if (res.data.success === false){
      let error = res.data.error;
      setMessage(error);
      setDetails(null);
    }
    else{
      setMessage(null);
      setDetails(res.data.datos);
    }
  }
  
  function renderData(){
    if (details?.data) {
  
    return <div> 
      <div className="row align-items-center mt-3">
        <div className="col-sm-2">
          Solicitudes: {details.total}
        </div>
      </div>
    
    <div className="table-responsive" id="table">
    <table className=" table table-info table-striped">
      <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tipo</th>
            <th scope="col">Nombre infante </th>
            <th scope="col">Fecha</th>
            <th> Status </th>
          </tr>
      </thead>
      <tbody>

      { Object.values(details?.data).map((elemento) => (
        
        <tr key={elemento.id}>
          <th scope="row">{elemento.id}</th>
          <td>{elemento.tipo.nombre}</td>
          <td>{elemento.infante?.nombre + " " + elemento.infante?.apaterno + " " + elemento.infante?.amaterno}</td>
          <td>{elemento.created_at }</td>
          <td>{elemento.status === 1 ? "confirmado" : elemento.status === 2 ? "No vino" : "Pendiente"}</td>
        
        </tr> 
        ))
      }
            
      </tbody>
    </table>  
    </div>
    <nav aria-label="...">
      <ul className="pagination">
        { paginator(details.links,FetchData) }
      </ul>
    </nav> 
    
    </div>
    }else{
      return <div></div>
    }
  }

  return (
    <div className="row m-5">
      <form className="w-full max-w-lg">
        <div className="col-sm-12">
        <label htmlFor="search" className="form-label"> <b className="ms-3"> Buscar solicitudes:</b>   </label>
            <div className="card p-4">

                <div className="card-body">
                
                  <label htmlFor="curp" className="form-label ms-3"> <b> Curp:</b> 
                    <input name="curp" id="curp" className="form-control mt-3" onChange={handleChange}></input>
                  </label>
                  <label htmlFor="email" className="form-label ms-3"> <b> Correo:</b>  
                    <input name="email" type="email" id="email" className="form-control mt-3" onChange={handleChange}></input>
                  </label>
             
                  <div className="flex items-center justify-end ms-3 mt-4">
                    <button className="ml-4 btn btn-success" onClick={handleSubmit}>Enviar</button>
                  </div>
                  {message ? <p className="bg-danger text-wh ite p-2 mt-3 rounded">{message}</p> : null}
                </div>
            </div>
        </div>
      </form>
      {renderData()}
    </div>
  )
}

export default Inicio