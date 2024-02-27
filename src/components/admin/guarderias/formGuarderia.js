import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import AuthUser from "../../auth/AuthUser";

export default function FormGuarderia({formNew = true}) {

  const {http} = AuthUser();
  const navigate = useNavigate();
  let { id } = useParams();  

  const [form, setForm] = useState({
    nombre: '',
    centro: '',
    domicilio: '',
    telefono: '',
    responsable: '',
    active: 0,

  })

  useEffect(()=> {
    if (id) {
        fetchDetail();
    }

},[id]);

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
        let response = {};
       
            response = await http.get('/admin/guarderias/'+id);
        
        console.log(response.data.guarderia)

 
    setForm(response.data.guarderia);
    } catch (error) {
        console.log(error);
    }
 }
  
const handleSubmit = (e) => {
  e.preventDefault()
  console.log(formNew)
  if (formNew!==false) {
    postData(form);
  }else{
    console.log("aqui")
    putData(form);       
  }
}

const postData = () =>{
    console.log(form);
    http.post('/admin/guarderias',form ).then((res)=>{
       console.log(res)
    //    navigate('/guarderias');
    }).catch(function (error) {
      console.log(error);
    });
}

const putData = async (form) =>{

  try {
    
    const res = await  http.put('/admin/guarderias/'+form.id,form );

    if (!res.data.success) {
      for (const key in res.data.error.errors) {

          let error = res.data.error.errors[key];
          setMessage(oldMessage => [
            ...oldMessage,
            {message: error.message}
          ])
       
      }
    }
    else{
      navigate('/guarderias');
    }

  } catch (error) {
    console.log(error);
  }
  
};

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="col-sm-12">
        <b> {formNew!==false ? "Agregar " : 'Editar '}
             Guarderia</b> 
            <div className="card p-4">
                <div className="card-body">

                    <div className="mb-3">
                      <label className="form-label">Nombre: </label>
                      <input type="text" name="nombre" id="nombre" className="form-control" value={form.nombre} aria-describedby="helpId" onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Centro: </label>
                      <input type="text" name="centro" id="centro" className="form-control" value={form.centro} aria-describedby="helpId" onChange={handleChange} />
                     
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Domicilio: </label>
                      <input type="text" name="domicilio" id="domicilio" className="form-control" value={form.domicilio} aria-describedby="helpId" onChange={handleChange} />
                     
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Teléfono: </label>
                      <input type="text" name="telefono" id="telefono" className="form-control"  value={form.telefono} aria-describedby="helpId" onChange={handleChange} />
                     
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Responsable: </label>
                      <input type="text" name="responsable" id="responsable" className="form-control"  value={form.responsable} aria-describedby="helpId" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Activo: </label>
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

                    

                  
                    <div className="flex items-center justify-end mt-4">

                      <button className="ml-4">Enviar</button>
                    </div>
                    {
                      message.map(({message}) => (
                        <p key={message}>{message}</p>
                      ))
                    }

                </div>
            </div>
        </div>
        </form>
  )
}
