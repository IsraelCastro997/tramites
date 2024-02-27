import { Routes,Route, NavLink } from "react-router-dom";
import Home from "../home";
import Dashboard from "../dashboard";
import AuthUser from "../auth/AuthUser";
import Padres from "../solicitudes/padres";
import Solicitudes from "../solicitudes/solicitudes";
import Infante from "../solicitudes/infante";
import BeneficiariosGuarderia from "../admin/beneficiarios/beneficiariosGuarderia";
import BeneficiariosMenu from "../admin/beneficiarios/beneficiariosMenu";
import BeneficiariosDespensa from "../admin/beneficiarios/beneficiariosDespensa";
import Guarderias from "../admin/guarderias/guarderias";
import GuarderiaEspacio from "../admin/guarderias/guarderiaEspacio";
import FormGuarderia from "../admin/guarderias/formGuarderia";
import SalaGuarderia from "../admin/guarderias/salaGuarderia";
import SalaInfante from "../admin/guarderias/salaInfante";
import Sidebar from "../admin/sidebar";
import Users from "../admin/usuarios/users";
import SolicitudesEspera from "../admin/solicitudes/solicitudesEspera";
import Calendar from "../admin/agenda/calendar";
import Citas from "../admin/agenda/citas";
import FormUser from "../admin/usuarios/FormUser";

import {
  FaSearch,
  FaSignOutAlt,
  FaHome
 
} from 'react-icons/fa';
import MenuSolicitud from "../admin/solicitudes/menuSolicitud";
import InfantesSalaGuarderia from "../admin/guarderias/infantesSalaGuarderia";


export default function Auth() {

    const {token,logout,user} = AuthUser();
    const logoutUser = () => {
      if (token !== undefined) {
          logout();
      }
    }

    function search(params) {
      console.log("search")
    }
  
    return (
    <>
      <nav className="navbar navbar-expand bg-navbar w-100">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav align-items-center mt-1 mb-lg-0">
              <li className="nav-item">
                <NavLink className="link" to="/me">Perfil</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="link" aria-current="page" to="/"><FaHome/></NavLink>
              </li>
              <li className="nav-item">
                <span role="button" className="link" onClick={logoutUser}><FaSignOutAlt/></span>
              </li>
            </ul>
            <form className="d-flex form-search" onSubmit={search} role="search">
              <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search"/>
              <button className="btn btn-outline-secondary" type="submit"><FaSearch/></button>
            </form>
          </div>
        
      </nav>
  
      <Sidebar rol={user.rol}>
        <Routes>

            <Route path="/calendar" element={<Calendar/>}/>
            <Route path="/citas" element={<Citas/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/guarderias-queue" element={<SolicitudesEspera/>}/>

            <Route path="/add-empleado" element={<FormUser empleado={true} formNew={true}/>}/>
            
            {/* TUTORES  */}
            {/* <Route path="/register-madre/:request" element={<Padres url="post-madre" formNewUser={true} tipo="madre" />} />
            <Route path="/register-infante/:request" element={<Infante formNewUser={true} />} /> */}
       
            <Route path="/update-padre/:id" element={<Padres url={"update-padre/"} formNewUser={false} tipo="padre"/>}/>
            <Route path="/update-madre/:id" element={<Padres url={"update-madre/"} formNewUser={false} tipo="madre"/>}/>
            <Route path="/update-infante/:id" element={<Infante url={"update-infante/"} formNewUser={false}/>}/>
            
            {/* USUARIOS  */}
            <Route path="/update-user/:id" element={ <FormUser formNew={false}/>}/>
            <Route path="/me" element={<FormUser formNew={false}/>}/>
            <Route path="/usuarios" element={<Users/>}/>
            
            {/* BENEFICIARIOS  */}
            <Route path="/beneficiarios" element={<BeneficiariosMenu/>}/>
            <Route path="/beneficiarios-guarderia" element={<BeneficiariosGuarderia/>}/>
            <Route path="/beneficiarios-despensa" element={<BeneficiariosDespensa/>}/>

            {/* GUARDERIAS */}
            <Route path="/salas-guarderia/:id" element={<GuarderiaEspacio/>}/>
            <Route path="/sala-infante/:solicitud/" element={<SalaInfante/>}/>
            <Route path="/guarderia-edit/:id" element={<FormGuarderia formNew={false}/>}/>
            <Route path="/agregar-guarderia/" element={<FormGuarderia formNew={true}/>}/>
            <Route path="/guarderias" element={<Guarderias/>}/>
            <Route path="/edit-sala-guarderia/:id" element={<SalaGuarderia formNew={false}/>}/>
            <Route path="/ver-infantes/:id" element={<InfantesSalaGuarderia/>}/>
            
            <Route path="/add-sala-guarderia/:guarderia" element={<SalaGuarderia formNew={true}/>}/>

            {/* SOLICITUDES  */}
            <Route path="/solicitudes" element={<Solicitudes/>}/>
            <Route path="/solicitud-guarderia/:id" element={<MenuSolicitud/>}/>
            {/* <Route path="/documentacion/:id" element={<DocumentacionMenu />} /> */}

        </Routes>
      </Sidebar>

    </> 
  )
}
