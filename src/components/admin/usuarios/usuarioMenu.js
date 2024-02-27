import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthUser from "../auth/AuthUser"

export default function UsuarioMenu(props) {
    const {http} = AuthUser();
    const [userDetails,setUserDetails] = useState('');
  
    useEffect(()=> {
        fetchUserDetail();
    },[]);

    async function fetchUserDetail(){
        try {
            const res = await http.post('me');
            setUserDetails(res.data.user);
            console.log(res.data.user)
        } catch (error) {
            console.log(error);
        }
    }

    function submitForm(e){
        http.post('/status-solicitud',e).then((res)=>{        
            fetchUserDetail()
        })
    }

    function renderElement(){

        if (!userDetails) {
            return <p>....Loading</p>
        }else{
        
        return  <div className="row">
                 
                    <div className="col-md-4 my-3">
                        <NavLink className="btn btn-success" to="/crear-solicitud">Hacer solicitud nueva</NavLink>
                    </div>

            <div className="table-responsive">
                <table className=" table table-info table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Status</th>
                        <th scope="col">Información</th>
                        <th></th>
                        <th scope="col">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
        
                    {Object.values(userDetails.solicitudes).map((solicitud,i) => (
                    <tr key={solicitud.id}>
                        <th scope="row">{i+1}</th>
                        <td>{solicitud.tipo?.nombre }</td>
                        <td>{solicitud.created_at }</td>
                        <td>{solicitud.sala_g?.estado.nombre}</td>
                        <td>Guarderia {solicitud.sala_g?.capacidad?.guarderia?.centro}</td>

                        <td>{solicitud.sala_g?.status === 2 ?  <button className="btn btn-danger btn-sm" onClick={()=> {submitForm(solicitud)}}  type="button">Cancelar</button> : solicitud.sala_g?.status === 3 ?   <button className="btn btn-success btn-sm" onClick={()=> {submitForm(solicitud)}}  type="button">Reanudar</button> : null}</td>

                        <td>{solicitud.sala_g?.status === 2 || !solicitud.sala_g ? <NavLink className="btn btn-warning btn-sm"  to={"/solicitud-"+solicitud.tipo?.nombre+"/"+solicitud.id} >Editar</NavLink> : null} </td>
                        
                    </tr>
                    ))
                }
                    
                </tbody>
                </table>  
            </div>

        </div>
        }
    }
  
  return (
    <>{renderElement()}</>
   )
}
