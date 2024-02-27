import { useState } from "react"
import { useNavigate } from "react-router-dom";
import AuthUser from "../auth/AuthUser";
import { fetchCurp } from "../helpers/fetchCurp";
export default function Register() {

    const navigate = useNavigate();
    const {http} = AuthUser();
    const [message,setMessage] = useState([]);

    const [form, setForm] = useState({
      apaterno: "",
      amaterno: "",
      curp: "",
      nombre: "",
      celular: "",
      email: "",
      password: "",
      password_confirmation: ''
    
    },[])

    const handleChange = (e) => {
 
      let {value,name} = e.target
    
      setForm({
          ...form,
          [name]: value
      })
      
    }

    const curp = (e) =>{
      fetchCurp(form,setForm,http,e);
    } 

   const handleSubmit = (e) => {
    e.preventDefault()
      postData(form);       
    
  }

  const postData = async (form) =>{
    setMessage([])
    console.log(form);
    try {
      
      const res = await  http.post('register/',form );
  
      if (!res.data.success) {
        console.log(res);
        for (const key in res.data.errors) {
  
            let error = res.data.errors[key];
            setMessage(oldMessage => [
              ...oldMessage,
              {message: error[0]}
            ])
        }
      }
      else{
        window.alert('Usuario registrado Exitosamente')
        navigate('/login');
      }
  
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-sm-6">
        <div className="card p-4">
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            
            <div className="card-body">

              <div className="mb-3">
                <label className="form-label">Curp: </label>
                <input type="text" value={form.curp} name="curp" id="curp" className="form-control" placeholder="" maxLength={18} aria-describedby="helpId" onChange={(e) => {curp(e);handleChange(e);}}  /> 
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre: </label>
                <input type="text" value={form.nombre} name="nombre" id="nombre" className="form-control" placeholder="" aria-describedby="helpId" onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">Apellido paterno: </label>
                <input type="text" value={form.apaterno} name="apaterno" id="apaterno" className="form-control" placeholder="" aria-describedby="helpId" onChange={handleChange} />
                
              </div>

              <div className="mb-3">
                <label className="form-label">Apellido materno: </label>
                <input type="text" value={form.amaterno} name="amaterno" id="amaterno" className="form-control" placeholder="" aria-describedby="helpId" onChange={handleChange} />
                
              </div>

              <div className="mb-3">
                <label className="form-label">Teléfono: </label>
                <input type="number" value={form.celular} name="celular" id="celular" className="form-control" aria-describedby="helpId" onChange={handleChange} />
                
              </div>

              <div className="mb-3">
                <label className="form-label">Correo: </label>
                <input type="email" value={form.email} name="email" id="email" className="form-control" placeholder="" aria-describedby="helpId" onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label  className="form-label">Password: </label>
                <input type="password" name="password" id="password" className="form-control" placeholder="" required aria-describedby="helpId" onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label  className="form-label">Confirmar Password: </label>
                <input type="password" name="password_confirmation" id="password_confirmation" className="form-control" required aria-describedby="helpId" onChange={handleChange} />
              </div>

                  {/* <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="remember"/>
                    <label className="form-check-label" >
                      Recordarme
                    </label>
                  </div> */}
              <div className="flex items-center justify-end mt-4">

              <button className="ml-4 btn btn-success btn-sm">Enviar</button>
              </div>
                {
                  <div className="mt-5">
                  {  message.map(({message}) => (
                    <p className="bg-danger rounded p-2" key={message}>{message}</p>
                  ))
                  }
                  </div>
                  
                }

            </div>
          </form>
        </div>
      </div>
        
    </div>
  )
}
