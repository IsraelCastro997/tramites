import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
    FaBars,
    FaUserAlt,
    FaThList,
    FaUserFriends,
} from 'react-icons/fa';

export default function SidebarSolicitudes({ infante, madre, padre, sala_guarderia, documentacion, children }) {

    useEffect(() => {

    }, [children]);
    
    const [isOpen, setIsOpen] = useState();
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className='d-flex bg-main'>
            <div style={{ width: isOpen ? "190px" : "50px" }} className='sidebar'>
                <div className='top_section'>
                    <figure style={{ display: isOpen ? "block" : "none" }} className='logo'><img src="/logo/Logo_DIF.png" className="img-fluid" alt="DIF Zapopan" width={100} /></figure>
                    <div className='bars'>
                        <FaBars onClick={toggle} />
                    </div>
                </div>

                {!sala_guarderia ? null : <NavLink key={1} className={"link "+ (infante ? "w-100 rounded bg-success" : null)} activeclassname="active" to={"/register-infante/undefined"}><div className='icon' data-bs-toggle="tooltip" data-bs-placement="top" title="infante"><FaUserAlt />  </div><div style={{ display: isOpen ? "block" : "none" }} className="link_text">Infante </div></NavLink>}
                    
                {!sala_guarderia ? null : <NavLink key={2} className={"link "+ (madre ? "w-100 rounded bg-success" : null)} activeclassname="active" to={"/register-madre/undefined"}>   <div className='icon' data-bs-toggle="tooltip" data-bs-placement="top" title="Madre"><FaUserFriends /> </div><div style={{ display: isOpen ? "block" : "none" }} className="link_text">Madre/ Tutor</div></NavLink>}

                {!sala_guarderia ? null : <NavLink key={3} className={"link "+ (padre ? "w-100 rounded bg-success" : null)} activeclassname="active" to={"/register-padre/undefined"}><div className='icon' data-bs-toggle="tooltip" data-bs-placement="top" title="Documentacion"><FaUserFriends /> </div>  <div style={{ display: isOpen ? "block" : "none" }} className="link_text">Padre </div> </NavLink>}

                {!sala_guarderia ? null : <NavLink key={4} className={"link "+ (documentacion ? "w-100 rounded bg-success" : null)} activeclassname="active" to={"/upload-documentacion/undefined"}><div className='icon' data-bs-toggle="tooltip" data-bs-placement="top" title="Documentacion"><FaThList /> </div>
                <div style={{ display: isOpen ? "block" : "none" }} className="link_text ">Documentación</div></NavLink>}

            </div>
            <main style={{ marginLeft: isOpen ? "190px" : "50px" }}>
                {children}
            </main>

            {/* DUCD900209HJCRMN05 */}
        </div>
    )
}
