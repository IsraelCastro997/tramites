import { NavLink } from "react-router-dom";

export default function BeneficiariosMenu() {


  return (
    <div>
                {/* <button className="btn btn-info mx-3" id={1} onClick={(e)=> {submitForm(e)}}>Solicitud guarderia</button> */}
        <NavLink className="btn btn-info mx-3" to={"/beneficiarios-guarderia/"} >Beneficiarios guarderias</NavLink>
        <NavLink className="btn btn-success mx-3" to={"/beneficiarios-despensa/"} >Beneficiarios despensa</NavLink>
    </div>
  

  )
}
