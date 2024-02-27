import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import AuthUser from "../../auth/AuthUser";
import ListGuarderiaSala from "../../queriesComponents/ListaGuarderiaSala";

export default function SalaInfante() {
    const {http} = AuthUser();
    const navigate = useNavigate();
    let { solicitud } = useParams();  
    const [ListGuarderia, setListGuarderia] = useState([]);
    const [nombre,setNombre] = useState([]);
    const [form, setForm] = useState({
        sala_g_id: "",
        status: 0,
        solicitud_id:solicitud,
        id:''
    })
  
    useEffect(()=> {
        fetchDetail();
  },[]);
  
    const [message,setMessage] = useState([]);
  
    const handleChange = (e) => {
   
      let {value,name} = e.target
      setForm({
          ...form,
          [name]: value
      })
    }

    async function fetchDetail(){
      try {
      
            const response = await http.get('sala-infante/'+solicitud);
          
            const res =  await http.get('guarderias-salas');

            setListGuarderia(res.data.datos);
           
           const data = response.data.data;
           setNombre(data.solicitud.infante);
          
            setForm({
                ...form,
                sala_g_id:data.sala_g_id,
                status: data.status,
                solicitud:solicitud,
                id:data.id
            })
           
      } catch (error) {
          console.log(error);
      }
   }
    
  const handleSubmit = (e) => {
    e.preventDefault()
    postData(form);
  }
  
  const postData = () =>{
      console.log(form);
        http.post('sala-infante',form ).then((res)=>{
      
          if (res.data.success === false) {
     
            let error = res.data.errors;
            console.log(error);
            setMessage(error);
            // for (const key in res.data.errors) {
            //     setMessage(oldMessage => [
            //       ...oldMessage,
            //       {message: error}
            //     ])
            // }
           
          }
          else{
            alert("Operacion exitosa")
             navigate('/admin/beneficiarios-guarderia');
          }
       
      }).catch(function (error) {
        console.log(error);
      });
  }
  
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="col-sm-12">
            
            {nombre ? <div>usuario {nombre.nombre} </div> : null }
              <div className="card p-4">
                  <div className="card-body">
                 
                  <ListGuarderiaSala form={form} handleChange={handleChange} list={ListGuarderia}></ListGuarderiaSala>
  
                      <div className="mb-3">
                          <label  className="form-label">Status: </label>
                          <select
                              id="status"
                              name="status"
                              type="text"
                              value={form.status}
                              className="form-control"
                              onChange={handleChange }
                              required
                              autoFocus
                              autoComplete="off"
                          >
                              <option value="6">Inactivo</option>
                              <option value="5">Activo</option>
                          </select>
                      </div>
                    
                      <div className="flex items-center justify-end mt-4">
  
                        <button className="ml-4 btn btn-success">Enviar</button>
                      </div>

                      {message.length !== 0 ? <p className="bg-danger text-white p-2 mt-3 rounded">{message}</p> : null} 
                      {/* {
                        message.map(({message}) => (
                          <p key={message}>{message}</p>
                        ))
                      } */}
  
                  </div>
              </div>
          </div>
          </form>
    )
  }
  