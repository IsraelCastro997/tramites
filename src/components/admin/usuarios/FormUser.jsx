import { useEffect, useState } from "react"
import AuthUser from "../../auth/AuthUser";
import { useNavigate, useParams } from "react-router-dom";
import ListArea from "../../queriesComponents/listAreas";

export default function FormUser({formData, formNew = true}) {
  let { id } = useParams();  
  const {http} = AuthUser();
  const navigate = useNavigate();
  const [message,setMessage] = useState([]);
  const [listAreas, setListAreas] = useState([]);

    const [form, setForm] = useState({
    curp: '',
    nombre:'',
    apaterno: '',
    amaterno: '',
    celular: '',
    email: '',
    password: "",
    password_before: '',
    area:''
  })

  useEffect(()=> {
    if (id || formNew == true) {
      fetchDetail();
      fetchAreas()
    }
    else{
      fetchMe()
    }
  
  },[id]);

  async function fetchMe(){
      try {
        let response = {}; 
        response = await http.post('me');
        setForm(response.data.user);
      } catch (error) {
          console.log(error);
      }
  }

  async function fetchDetail(){
    try {
      let response = {}; 
      response = await http.get('users/'+id);
      setForm(response.data.user);
    } catch (error) {
        console.log(error);
    }
 }

  const handleChange = (e) => { 
    let {value,name} = e.target
    setForm({
        ...form,
        [name]: value
    })
  }

  async function fetchAreas() { 
    try {   
      const response = await http.get('areas');
      setListAreas(response.data.datos);
    } catch (error) {
      console.log(error);
    }
}

  
async function postData(e){
  e.preventDefault()
  let res;
  try {

    if (formNew===true) {
      res = await http.post('users/',form);
    }else{
      res = await http.put('users/'+formData.id,form);
    }

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
      navigate('/');
    }

  } catch (error) {
    console.log(error);
  }
  
};

function renderEmpleado(){
    if (formNew) {
      return <div className="mb-3">
      <ListArea form={form} handleChange={handleChange} list={listAreas}></ListArea>
    </div>
    }else{
      return null
    }
}

  return (
    <form onSubmit={postData} className="w-full max-w-md">
        <div className="col-sm-12">
            <div className="card p-4">
                <div className="card-body">
                  {renderEmpleado()}

                    <div className="mb-3">
                      <label className="form-label">Curp: </label>
                      <input type="text" name="curp" id="curp" className="form-control" value={form.curp}  onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Nombre: </label>
                      <input type="text" name="nombre" id="nombre" className="form-control" value={form.nombre} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Apellido paterno: </label>
                      <input type="text" name="apaterno" id="apaterno" className="form-control" value={form.apaterno}  onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Apellido materno: </label>
                      <input type="text" name="amaterno" id="amaterno" className="form-control" value={form.amaterno}  onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Teléfono: </label>
                      <input type="number" name="celular" id="celular" className="form-control"  value={form.celular} onChange={handleChange} />
                     
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Correo: </label>
                      <input type="email" name="email" id="email" className="form-control"  value={form.email} autoComplete="off" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label  className="form-label">Password: </label>
                      <input type="password" name="password_before" id="password_before" className="form-control" placeholder=""  onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label  className="form-label">Nuevo Password: </label>
                      <input type="password" name="password" id="password" className="form-control" placeholder="" onChange={handleChange} />
                    </div>
                  
                    <div className="flex items-center justify-end mt-4">

                      <button className="ml-4 btn btn-success">Enviar</button>
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
