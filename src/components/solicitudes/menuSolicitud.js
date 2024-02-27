import { NavLink, useNavigate } from "react-router-dom";

export default function MenuSolicitud() {

  return (
    <div className="container mt-5">
        <NavLink className="btn btn-info mx-3" to={"/solicitud-guarderia/"}>Solicitud guarderia</NavLink>
        {/* <button  id={1} onClick={(e)=> {submitForm(e)}}>Solicitud guarderia</button> */}
        <NavLink className="btn btn-info mx-3" id={2} to={"/solicitud-despensa/"} 
        // onClick={(e)=> {submitForm(e)}}
        >Solicitud despensa</NavLink>
    </div>
  

  )
}
