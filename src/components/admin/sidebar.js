import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaThList,
    FaSchool,
    FaUserFriends,
    FaStickyNote,
    FaCalendar,
    FaClock,
} from 'react-icons/fa';
import AuthUser from '../auth/AuthUser';

export default function Sidebar({rol,children}) {

    const {http} = AuthUser();
    const [details,setDetails] = useState('');
    useEffect(()=> {
    
     if (rol > 1) {
        http.get('/admin/sidebar').then((res)=>{        
            // console.log(res)
            setDetails(res.data)
        })
     }
    },[children]);


    const [isOpen, setIsOpen] = useState();
    const toggle = () => setIsOpen (!isOpen);

    const menuItem=[
        {
            path:"/dashboard",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/solicitudes",
            name:"Solicitudes",
            icon:<FaStickyNote/>,
            num: details.solicitudes
        },
        {
            path:"/usuarios",
            name:"Usuarios",
            icon:<FaUserAlt/>
        },
        {
            path:"/beneficiarios-guarderia",
            name:"Beneficiarios",
            icon: <FaThList/>
        },
        {
            path:"/guarderias-queue",
            name:"Espera",
            icon:<FaUserFriends/>,
            num: details.espera
        },
        {
            path:"/calendar",
            name:"Calendario",
            icon:<FaCalendar/>,
            num: details.agenda
        },
        {
            path:"/citas",
            name:"Citas",
            icon:<FaClock/>,
            num: details.citas
        },
        
    ]

    if (rol > 2){
      
        menuItem.push({
            path:"/guarderias",
            name:"Guarderias",
            icon:<FaSchool/>
        })
    }

  return (
    <div className='d-flex bg-main'>
        <div  style={{ width: isOpen ? "160px" : "50px"}} className='sidebar'>
            <div className='top_section'>
                <figure  style={{ display: isOpen ? "block" : "none"}} className='logo'><img src="/logo/Logo_DIF.png" className="img-fluid" alt="DIF Zapopan" width={100}/></figure>
                <div  className='bars'>
                    <FaBars onClick={toggle} />
                </div> 
            </div>
            
            { rol > 1 ? 
            menuItem.map((item,index)=> (
            <NavLink to={item.path} key={index} className="link" activeclassname="active">
                <div className='icon' data-bs-toggle="tooltip" data-bs-placement="top" title={item.name}>{item.icon} <small className='text-danger'> {item.num} </small> </div>
                <div style={{ display: isOpen ? "block" : "none"}} className='link_text'>{item.name}</div>
            </NavLink>
            )) : null
            }
          
        </div>
        <main style={{ marginLeft: isOpen ? "165px" : "55px"}}>
            {children}
        </main>
    </div>
  )
}
