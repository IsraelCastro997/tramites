import { useState } from "react"
import AuthUser from "../auth/AuthUser";
export default function Login() {

  const {http,setToken} = AuthUser();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  const submitForm = () => {
    
      http.post('/login',{email:email,password:password}).then((res)=>{
          setToken(res.data.user,res.data.access_token)
      })
  }

  return (
    <div className="row justify-content-center pt-5 mt-5">
        <div className="col-sm-6">
            <div className="card rounded-3 p-4">
              <div className="card-header justify-content-center mx-auto">
                <img src="/logo/Logo_DIF.png" className="img-fluid rounded-top App-logo" alt="DIF Zapopan" width={210}/>
              </div>
                <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Correo: </label>
                      <input type="email" name="email" id="email" className="form-control" placeholder="" aria-describedby="helpId" onChange={e=> setEmail(e.target.value)} />
                     
                    </div>
                    <div className="mb-3">
                      <label  className="form-label">Password: </label>
                      <input type="password" name="password" id="password" className="form-control" placeholder="" aria-describedby="helpId" onChange={e=> setPassword(e.target.value)} />
                      
                    </div>

                    {/* <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="remember"/>
                      <label className="form-check-label" >
                        Recordarme
                      </label>
                    </div> */}

                    <button type="button" onClick={submitForm} className="mt-3 btn btn-primary">Enviar</button>

                </div>
            </div>
        </div>
        
    </div>
  )
}
