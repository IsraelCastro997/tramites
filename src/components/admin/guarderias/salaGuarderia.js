import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import AuthUser from "../../auth/AuthUser";
export default function SalaGuarderia({formNew = true}) {
  
  const {http} = AuthUser();
  const navigate = useNavigate();

  let { id,guarderia } = useParams();  

  const [form, setForm] = useState({
    guarderia_id: guarderia,
    sala:'',
    capacidad: '',
    active: 0,

  })
  const [message,setMessage] = useState([]);

  useEffect(()=> {
    if (id) {
        fetchDetail();
    }
},[id]);

  const handleChange = (e) => {
 
    let {value,name} = e.target
 
    setForm({
        ...form,
        [name]: value
    })
    
  }
  async function fetchDetail(){
    try {
      let response = {};
      
      response = await http.get('/admin/sala-guarderia/'+id);
    setForm(response.data.guarderia);
    } catch (error) {
        console.log(error);
    }
 }
  
const handleSubmit = (e) => {
  e.preventDefault()
  if (formNew!==false) {
    postData(form);
  }else{
    putData(form);       
  }
}

const postData = () =>{
  
    http.post('/admin/sala-guarderia',form ).then((res)=>{
      
       navigate('/salas-guarderia/'+guarderia);
    }).catch(function (error) {
      console.log(error);
    });
}

const putData = async (form) =>{
  console.log(form);
  try {
    
    const res = await  http.put('/admin/sala-guarderia/'+form.id,form );
    console.log(res);
    if (res.data.success === false) {
     
      let error = res.data.errors;
      console.log(error);
      setMessage(error);
     
    }
    else{
      navigate('/salas-guarderia/'+ res.data.guarderia.guarderia_id);
    }

  } catch (error) {
    console.log(error);
  }
  
};

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="col-sm-12">
        <b> {formNew!==false ? "Agregar " : 'Editar '}
            Sala Guarderia</b> 
            <div className="card p-4">
                <div className="card-body">
                <div className="mb-3">
                        <label  className="form-label">Sala: </label>
                        <select
                            id="sala"
                            name="sala"
                            type="text"
                            value={form.sala}
                            className="form-control"
                            onChange={handleChange }
                            required
                            autoFocus
                            autoComplete="off"
                        >
                            <option value="">Seleccionar</option>
                            <option value="LAC">LAC</option>
                            <option value="MAT">MAT</option>
                            <option value="PRES 1">PRES 1</option>
                            <option value="PRES 2">PRES 2</option>
                            <option value="PRES 3">PRES 3</option>
                        </select>

                    </div>

                    <div className="mb-3">
                      <label className="form-label">Capacidad Instalada: </label>
                      <input type="text" name="capacidad" id="capacidad" className="form-control"  value={form.capacidad} aria-describedby="helpId" onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Activo: </label>
                        <select
                            id="active"
                            name="active"
                            type="text"
                            value={form.active}
                            className="form-control"
                            onChange={handleChange }
                            required
                            autoFocus
                            autoComplete="off"
                        >
                            <option value="0">Inactivo</option>
                            <option value="1">Activo</option>
                        </select>
                    </div>

                    {message.length !== 0 ? <p className="bg-danger text-white p-2 rounded">{message}</p> : null}  
                  
                    <div className="flex items-center justify-end mt-4">

                      <button className="ml-4 btn btn-success btn-sm">Enviar</button>
                    </div>
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
