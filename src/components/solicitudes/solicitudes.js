import { useState } from "react";
import AuthUser from "../auth/AuthUser"
import { NavLink, useNavigate } from "react-router-dom";
import Dashboard from "../dashboard";
import { paginator,orderColumn,FetchData } from "../helpers/fetchHelpers";
import CustomModal from "../helpers/customModal";

export default function Solicitudes() {
  const [details,setDetails] = useState('');
  const [openModal,setOpenModal] = useState(false);
  // const navigate = useNavigate();
  const [message,setMessage] = useState([]);
  FetchData('/admin/get-solicitudes',details,setDetails)
  const {fetch} = FetchData('/admin/get-solicitudes',details,setDetails)
  const {http} = AuthUser();
  const [modalAceptar,setModalAceptar] = useState("");
  const [motivo,setMotivo] = useState([]);

  const [searchForm,setSearchForm] = useState({
    params: "solicitud:email", 
    search: "",
  });

  var todayDate = new Date()
  const handleChange = e => {
    
    const {value,name} = e.target
    setMotivo(motivo)

    setSearchForm({
        ...searchForm,
        [name]: value
    })
  } 

  function modalRechazo(id,status){
    setMessage(
      <label>Motivo:
         <input name="motivo" id="motivo" className="form-control m-3" />
      </label>
    )
    setOpenModal(true)
     
    setModalAceptar(rechazarSolicitud(id,status))
  }
  
  // async function rechazarSolicitud (id,status) {
  //   console.log(id)
  //     try {
  //         const response = await http.post('/admin/validar-solicitud',{id,status,motivo});
  //         setMessage(
  //           'Solicitud Rechazada con exito'
  //         )
  //         setOpenModal(response.success)
  //     }catch (error) {
  //       console.log(error);
  //     }
    
  // }

  const rechazarSolicitud = (request,validate) => {
    console.log(document.getElementById('motivo').value)
    console.log("salu2")


    // console.log(motivo)
    // if (motivo.motivo != "") {
    //   (async  () => {
    //     try {
    //         const response = await http.post('/admin/validar-solicitud',{request,validate,motivo});
    //         setMessage(
    //           'Solicitud Rechazada con exito'
    //         )
    //         setOpenModal(response.success)
    //     }catch (error) {
    //       console.log(error);
    //     }
      
    //   })();
    // }
  }

  function submitForm(request,validate){
      http.post('/admin/validar-solicitud',{request,validate}).then((res)=>{
        alert('Operación Exitosa')
        console.log(res.data)
        fetch('/admin/get-solicitudes')
    })
  }


function renderSolicitudes(){
  if (details) {

  return <div>
    <div className="row align-items-center">
      <div className="col-sm-2"> Solicitudes: {details.total}</div>

      <div className="col-sm-2">
        <label htmlFor="search" className="form-label"> <b className="ms-3"> Buscar:</b>
          <input name="search" id="search" className="form-control m-3"  onChange={(e)=>orderColumn('/admin/search-solicitudes/2/'+e.target.value,searchForm,http,setDetails,fetch,'/admin/get-solicitudes')}></input>
        </label>
      </div>

      <div className="col-sm-2">
        <label htmlFor="params" className="form-label"> <b className="ms-3"> Por:</b>
          <select className="form-select m-3" name="params" 
            onChange={handleChange}>
            <option value="solicitud:email">Correo</option>
            <option value="infante:nombre">Nombre Infante</option>
            <option value="madre:celular">Teléfono</option>
            <option value="solicitud:id">Folio</option>
          </select>
        </label>
      </div>

      <div className="col-sm-2 offset-2"><button className="mt-3 btn btn-sm btn-primary" onClick={()=>{ fetch('admin/solicitudes-pendientes')} }>Pendientes</button></div>
      <div className="col-sm-2"><button className="mt-3 btn btn-sm btn-warning" onClick={()=>{ fetch('/admin/get-solicitudes')} }>Todas</button></div>
    </div>
  
    <div className="table-responsive" id="table">
      <table className="table table-info table-striped ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre Infante</th>
            <th scope="col">Correo</th>
            <th >Teléfono</th>
            <th>Situación</th>
            {details.data[0]?.sala_g ? <th>Guarderia</th> : null}
            <th>Solicitud</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        { Object.values(details?.data).map((elemento) => (
          <tr key={elemento.id}>
            <th scope="row" >{elemento.id}</th>
            <td style={{minWidth:" 300px"}}>{elemento.infante?.nombre+" " + elemento.infante?.apaterno+" " + elemento.infante?.amaterno}</td>
            <td style={{minWidth:" 150px"}}>{elemento.email}</td>
            <td style={{minWidth:" 150px"}}>{elemento.madre?.celular}</td>
            <td style={{minWidth:" 300px"}}>{elemento.situacion?.descripcion}</td>
            {elemento.sala_g ? <td> {elemento.sala_g.capacidad.guarderia.centro}</td> : null}
          
            <td>
              <NavLink className="btn btn-warning btn-sm" to={"/solicitud-"+elemento.tipo?.nombre+"/"+elemento.id} >Editar</NavLink>
            </td>
            {new Date(elemento.agenda?.start) < todayDate && elemento.agenda?.status ===1 ?
            <td className="d-flex flec x-column">
              <button className="btn btn-success btn-sm" onClick={()=>{submitForm(elemento,5)}} type="button">Aceptar </button> 
              <button className="btn btn-danger btn-sm" onClick={()=>{modalRechazo(elemento,1)}} type="button">Rechazar </button>
            </td> : <td></td>
            }
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
      {renderSolicitudes()}
      <CustomModal open={openModal} onClose={()=>setOpenModal(false)} message={message} aceptar={modalAceptar} />
    </div>
  )
}
