import { useEffect, useState } from "react";
import { TfiControlBackward } from "react-icons/tfi";
import { NavLink, useParams } from "react-router-dom";
import AuthUser from "../../auth/AuthUser"
import Dashboard from "../../dashboard";
import Modal from "../../helpers/modal";

export default function GuarderiaEspacio() {
  const [guarderiaDetails,setGuarderiaDetails] = useState('');
  const [openModal,setOpenModal] = useState({
    status: false, 
    id: "",
  },[]);
 

  const {http} = AuthUser();
  let { id } = useParams();  
  useEffect(()=> {
    fetchData()
  },[]);
    
  async function fetchData(){
    try {
      const response = await http.get('/admin/disponibilidad-guarderia/'+id);
      console.log(response.data.disponibilidad);
      setGuarderiaDetails(response.data.disponibilidad);
        
    }catch (error){
      console.log(error);
    }
  }

  function submitForm(id){

    http.post('/admin/liberar-sala',id).then((res)=>{  
      console.log(res.data);
      setOpenModal({
        openModal: false
      })
      fetchData()
    })
  }
    
  function renderguarderias(){
    if (guarderiaDetails) {
    
    return <div className="table-responsive">
    <table className=" table table-info table-striped">
      <thead>
          <tr>
              <th scope="col">#</th>
              <th>Guarderia</th>
              <th scope="col">Sala</th>
              <th scope="col">Capacidad Actual</th>
              <th scope="col">Capacidad Instalada</th>
              <th scope="col">Status</th>
              <th colSpan={3}></th>
          </tr>
      </thead>
      <tbody>
      
      {Object.values(guarderiaDetails).map((elemento) => (
          <tr key={elemento.id}>
              <th scope="row">{elemento.id}</th>
              <td>{elemento.guarderia.centro}</td>
              <td>{elemento.sala}</td>
              <td>{elemento.infantes}</td>
              <td>{elemento.capacidad}</td>
              <td>{elemento.active === 1 ? "Activa" : "Inactiva"}</td>
              <td><NavLink className="btn btn-info btn-sm"  to={"/edit-sala-guarderia/"+elemento.id} >Editar</NavLink></td>
              <td>
                <button className="btn btn-success btn-sm" onClick={() => {setOpenModal({status:true,id:elemento.id})}  }  type="button">Liberar cupos</button>
              </td>
              <td><NavLink className="btn btn-primary btn-sm"  to={"/ver-infantes/"+elemento.id} >Ver Infantes</NavLink></td>
          </tr>
          ))
      }
          
    </tbody>
    </table>  
    </div>
        
    }else{
      return <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
    }
  }
    
  return (
    <div className=" justify-content-center">
      <Dashboard></Dashboard>
      <NavLink className="btn btn-primary btn-sm mb-3 me-3"  to={"/guarderias/"} ><TfiControlBackward/> </NavLink>
      <NavLink className="btn btn-success btn-sm mb-3"  to={"/add-sala-guarderia/"+id} >Agregar sala</NavLink>
   
      <Modal open={openModal} submitForm={submitForm} onClose={()=> setOpenModal(false)} />
      { renderguarderias()}
    </div>
  )
}
    
    