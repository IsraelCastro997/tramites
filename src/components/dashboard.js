import { useEffect, useState } from "react";
import AuthUser from "./auth/AuthUser";
import { FaUserAlt } from 'react-icons/fa';
import { TfiEmail } from 'react-icons/tfi';

export default function Dashboard() {
    const {http} = AuthUser();
    const [userDetails,setUserDetails] = useState('');
   
    useEffect(()=> {
        async function fetchUserDetail(){
            try {
                const response = await http.post('me');

                setUserDetails(response.data.user);
              
            } catch (error) {
                console.log(error);
            }
         }
      
         fetchUserDetail()
    },[]);

   
    function renderElement(){
        if (userDetails.rol === 2) {
          
        return <div>

            <div className="row">
                <div className="col-sm-3 ms-3">
                    <h4> <FaUserAlt/> Usuario:</h4>
                    <p>{userDetails.nombre+ " " + userDetails.apaterno}</p>
                    </div>
                <div className="col-sm-3">
                    <h4> <TfiEmail/> Correo:</h4>
                    <p>{userDetails.email}</p>
                </div>
            </div>

        </div>
        }
        else{
            return <></>
        }
    }

    return (
        <div>
            {renderElement()}
        </div>
    )
}
