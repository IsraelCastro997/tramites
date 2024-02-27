import { Routes,Route, NavLink } from "react-router-dom";
import Home from "../home";
import Login from "../auth/login";

import MenuSolicitud from "../solicitudes/menuSolicitud";
import Padres from "../solicitudes/padres";
import SolicitudGuarderia from "../solicitudes/solicitudGuarderia";
import SolicitudDespensa from "../solicitudes/solicitudDespensa";
import Infante from "../solicitudes/infante";
import Inicio from "../inicio";
import Documentacion from "../solicitudes/documentacion";
import SidebarSolicitudes from "../solicitudes/sidebarSolicitudes";

export default function Guest() {

  const sala_guarderia = localStorage.getItem("sala_guarderia");
  const infante = localStorage.getItem("infante")
  const madre = localStorage.getItem("madre")
  const padre = localStorage.getItem("padre")
  const documentacion = localStorage.getItem("documentacion")
  return (
  <>
    <nav className="navbar navbar-expand bg-navbar w-100">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav align-items-center mt-1 mb-lg-0">
        <figure className='logo'><img src="/logo/Logo_DIF.png" className="img-fluid" alt="DIF Zapopan" width={100}/></figure>
          <li className="nav-item">
            <NavLink className="link" aria-current="page" to="/">Inicio</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="link" aria-current="page" to="/menu">Menu</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  
    <div className="container-fluid mt-5">
    <SidebarSolicitudes infante={infante} madre={madre} padre={padre} sala_guarderia={sala_guarderia} documentacion={documentacion} >
      <Routes>
        <Route path="/login" element={<Login/>} />
        
        {/* TUTORES  */}
        <Route path="/register-infante/:id" element={<Infante formNewUser={true}/>}/>
        <Route path="/register-madre/:id" element={<Padres formNewUser={true} tipo="madre"/>}/>
        <Route path="/register-padre/:id" element={<Padres formNewUser={true} tipo="padre"/>}/>
        <Route path="/upload-documentacion/:id" element={<Documentacion formNew={true} infante={infante} madre={madre} padre={padre} sala_guarderia={sala_guarderia} documentacion={documentacion} />}/>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/menu" element={<MenuSolicitud/>}/>
        <Route path="/solicitud-guarderia" element={<SolicitudGuarderia/>}/>
        <Route path="/solicitud-guarderia/:id" element={<SolicitudGuarderia/>}/>
        <Route path="/solicitud-despensa/" element={<SolicitudDespensa/>}/>
        <Route path="/solicitud-despensa/:id" element={<SolicitudDespensa/>}/>

      </Routes>
    </SidebarSolicitudes>
      
    </div>
  </> 
  )
}
