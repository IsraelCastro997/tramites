import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import AuthUser from "../../auth/AuthUser"

export default function MenuSolicitud() { 
    const {http} = AuthUser();
    const [solicitud,setSolicitud] = useState([]);

    let {id} = useParams(); 

    useEffect(()=> {
        fetchDetail()

    },[id]);

    async function fetchDetail(){
        try {
            const res =  await http.get('get-solicitud/'+id);
            console.log(res)
            setSolicitud(res.data.solicitud);
        } catch (error) {
            console.log(error);
        }
    }

    function renderElement(){
        if (solicitud ) {
        return <div className="row">

                <div className="col-md-4 mt-3 text-center">
                    <NavLink className="btn btn-success" to={"/update-infante/"+solicitud.infante_id}>Infante</NavLink>  
                </div>   
                        
                <div className="col-md-4 mt-3 text-center">
                    <NavLink className="btn btn-info" to={"/update-madre/"+solicitud.madre_id}>Madre</NavLink>
                </div>

                <div className="col-md-4 mt-3 text-center">
                    <NavLink className="btn btn-primary" to={"/update-padre/"+solicitud.padre_id}>Padre</NavLink>
                </div>

        </div>
        }else{
            return <div>
                    <button className="btn btn-success">No se pudieron obtener los datos de la solicitud</button>
                </div>
        }

    }

return (
    <div className="row my-3">
        {renderElement()}
    </div>
  
    )
}
