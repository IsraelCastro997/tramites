import { useEffect, useState } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import AuthUser from "../auth/AuthUser"
import CustomModal from "../helpers/customModal";
import ListGuarderiaSala from "../queriesComponents/ListaGuarderiaSala";

export default function SolicitudGuarderia() { 
    const {http} = AuthUser();
    const [ListGuarderia, setListGuarderia] = useState([]);
    const [disponibilidad,setDisponibilidad] = useState();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        sala_g_id: "",
        status: 1,
        email:"",
    })

    const sala_guarderia = localStorage.getItem("sala_guarderia");
    const infante = localStorage.getItem("infante")
    const madre = localStorage.getItem("madre")
    const documentacion = localStorage.getItem("documentacion")

    useEffect(()=> {
        fetchDetail()

    },[disponibilidad]);

    async function fetchDetail(){
        try {
            const res =  await http.get('guarderias-salas');
            setListGuarderia(res.data.datos);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleChange(e) {
        let {value,name} = e.target
        setForm({
            ...form,
            [name]: value
        })
       
        try {
            const res = await http.get('infantes-sala/'+e.target.value);
            setDisponibilidad(res.data.diposnibilidad);
          
        } catch (error) {
            console.log(error);
        }
    }

    async function submitForm(e){
       
        form.status = e.target.id;
        const email = document.getElementById('email').value;
       const regExp =  /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
        const validate = regExp.test(email)
         
        if(!validate){
            alert('Debe de introducir un correo electronico en el campo')
        }else{
            form.email = email;
            localStorage.setItem('sala_guarderia',JSON.stringify(form));
        }
       
        setDisponibilidad(null)
        navigate('/register-infante/undefined')
    }

    function renderElement(){
        // DUCD900209HJCRMN05
        if (!madre || !infante || !documentacion) {
        return <div className="row">
              
            {sala_guarderia ? <div>Proceso de solicitud ya iniciado <NavLink className="btn btn-primary btn-sm" to={"/register-infante/undefined"} >Continuar proceso</NavLink></div> :
                <div  id="select_g">
                <div className=" col-md-6">
                    <label className="form-label">Correo electrónico:</label>
                    <input className="form-control" type="email" name="email" id="email"/>
                </div>
                <ListGuarderiaSala form={form} handleChange={(e)=> handleChange(e,form,setForm)} list={ListGuarderia}></ListGuarderiaSala>
                </div>}  

            {disponibilidad==="Disponible" ? <p className="bg-info text-white p-2 mt-3 rounded">{disponibilidad} Quieres solicitar el cupo en esta guarderia? <button type="submit" id={2} onClick={submitForm} className="btn btn-success btn-sm">Si</button></p> : disponibilidad==="Sala llena" ? <p className="bg-info text-white p-2 mt-3 rounded">{disponibilidad} ¿Quieres entrar a la cola de espera? <button id={4} onClick={submitForm} className="btn btn-success btn-sm">Si</button> <button type="submit" className="btn btn-warning btn-sm">No</button></p> : null} 
        </div>
        }else{
            return  <div className="row my-3">
                        <div className="col-md-4"><button className="btn btn-success" >Terminar Solicitud</button></div>
                    </div>
        }

    }
  

return (
    <div className="row my-3">
        {renderElement()}
    </div>
  
    )
}
