import { useEffect, useState } from "react"
import AuthUser from "../auth/AuthUser";
import { useNavigate, useParams } from "react-router-dom";
import ListaCol from "../queriesComponents/listaCol";
import ListaEscolaridad from "../queriesComponents/listaEscolaridad";
import ListaVivienda from '../queriesComponents/listaVivienda';
import ListaOcupacion from "../queriesComponents/listaOcupacion";
import ListaEstadoCivil from "../queriesComponents/listaEstadoCivil";
import ListaEnfermedad from "../queriesComponents/listaEnfermedad";
import { fetchCurp } from "../helpers/fetchCurp";
import ListaServiciosM from "../queriesComponents/listaServiciosM";
import ListaIdioma from "../queriesComponents/listaIdioma";
import { calculate_age } from "../helpers/calculateAge";
import CustomModal from "../helpers/customModal";

export default function Padres(props) {
    const {url,tipo,formNewUser} = props;
    const {http} = AuthUser();
    const navigate = useNavigate();
    const [message,setMessage] = useState("Ingrese los datos de " +tipo);
    const [list, setList] = useState([]);
    const [ListOcupacion, setListOcupacion] = useState([]);
    const [ListVivienda, setListVivienda] = useState([]);
    const [ListEnfermedad, setListEnfermedad] = useState([]);
    const [ListEscolaridad, setListEscolaridad] = useState([]);
    const [ListEstadoCivil, setListEstadoCivil] = useState([]);
    const [ListServiciosM, setListServiciosM] = useState([]);
    const [ListIdioma, setListIdioma] = useState([]);
    const [openModal,setOpenModal] = useState(true,[]);
    const [close,setClose]= useState()

    let { id } = useParams();  
  
    const [form, setForm] = useState({
        curp: '',
        nombre: '',
        apaterno: '',
        amaterno: '',
        estudia:'',
        grado_estudios:'',
        escolaridad: '',
        ocupacion:'',
        lugar_nacimiento:'',
        estado_civil:1,
        calle:'',
        numext:'',
        numint:'',
        primercruce:'',
        segundocruce:'',
        fechanacimiento:'',
        celular:'',
        sexo:'',
        lenguamaterna:'',
        serviciosmedicos:'',
        vivienda:'',
        municipio:'',
        codigopostal:'',
        colonia:'',
        trabaja:'',
        domicilio_trabajo:'',
        entrada_trabajo:'',
        salida_trabajo:'',
        celular_trabajo:'',
        enfermedad:'',
        enfermedad_otro:''
    })

    useEffect(()=> {
       console.log(tipo)
       setOpenModal(true)
       setMessage("Ingrese los datos de " +tipo)
        fetchCatalogos()
        if (localStorage.getItem(tipo)) {
           const tutor =  JSON.parse(localStorage.getItem(tipo)); 
           fetchColonias(tutor.codigopostal);
            setForm(tutor);
        }
        if(id !== "undefined"){
            fetchDetail();
        }

    },[tipo,id]);


    async function  calculate_Age(e){
        const res = await calculate_age(e);
        setTimeout( ()=> {

            if(res < 18) {
                document.getElementById('student_form').classList.remove('d-none')
                console.log(res)
            }else{
                document.getElementById('student_form').classList.add('d-none')
                console.log(res)
            }

        }, 1000);
    }  

    async function fetchDetail(){
        let response = {};
        try {
            if (tipo === "madre") {
                response = await http.get('get-madre/'+id);
            }else{
                response = await http.get('get-padre/'+id);
            }

      
        setForm(response.data.padre);

        } catch (error) {
            console.log(error);
        }
        fetchColonias(response.data.padre.codigopostal);
     }

    async function fetchCatalogos() { 
        try {   
            const response = await http.get('http://datac.difzapopan.gob.mx/api-servicios/public/api/data/catalogos');
            setListOcupacion(response.data.ocupacion);
            setListEscolaridad(response.data.escolaridad);
            setListVivienda(response.data.vivienda);
            setListEnfermedad(response.data.enfermedad);
            setListEstadoCivil(response.data.estadocivil);
            setListServiciosM(response.data.serviciosmedicos);
            setListIdioma(response.data.idioma);

        } catch (error) {
            console.log(error);
        }
    }

    async function curp(e){
        const age = await fetchCurp(form,setForm,http,e,fetchColonias,calculate_age);
      
        setTimeout( ()=> {

            if(age < 18) {
                document.getElementById('student_form').classList.remove('d-none')
                console.log(age)
            }else{
                document.getElementById('student_form').classList.add('d-none')
                console.log(age)
            }

        }, 1000);

    } 

    async function fetchColonias(e) {  
       let {value} = ""
       if (!e.target) {
        value = e 
       }else{
        value = e.target.value
       }
        try {   
            const response = await http.get('http://datac.difzapopan.gob.mx/api-servicios/public/api/data/colonias/'+value);
            setList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const putData = async (form) =>{

        try {
            console.log(form);
            const res = await  http.put(url +id,form );
            const data = await res.data;
            console.log(data);
            if (!data.success) {
                for (const key in data.error.errors) {
        
                    let error = data.error.errors[key];
                    setMessage(oldMessage => [
                    ...oldMessage,
                    {message: error.message}
                    ])
                }
            }
            else{
                
            }
      
        } catch (error) {
          console.log(error);
        }
    }

    const postData = () =>{
    localStorage.setItem(tipo,JSON.stringify(form));
    if (tipo === "madre") {
        setClose(()=> navigate('/register-padre/undefined')) 
    }else{
        setClose(()=> navigate('/upload-documentacion/undefined'))
    }
        setMessage('Operacion Realizada Con Exito')
        setOpenModal(true)
    }

    const handleChange = e => {
        
        const {value,name} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleWork = e => {
        
        const value = e.target.value
        if (value === '0') {
            setMessage('No es posible brindar el servicio si actualmente no trabaja')
            setClose(()=> navigate('/'))
            setOpenModal(true)
        }
    }
  
    const handleSubmit = e => {
        e.preventDefault()
       
        if (formNewUser) {
            postData(form)
        }else{
            putData(form)
        }
    }
  
  return (
    <div className="container-fluid">
       
        {formNewUser ? <h1 >  Agregar {tipo}</h1>  :    <h1 >  Actualizar {tipo}</h1>}
  
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="row">
        <div className="col-md-4">
                <label className="form-label" htmlFor="curp">Curp</label>

                <input
                    id="curp"
                    name="curp"
                    type="text"
                    value={form.curp}
                    className="form-control"
                    placeholder="Curp"
                    onChange={(e) => {curp(e);handleChange(e);}}
                    required
                    autoFocus
                    maxLength={18}
                    autoComplete="off"
                />

                {/* <inputError messages={errors.nombre} className="mt-2" /> */}
            </div>
            <div className="col-md-4">
                <label className="form-label" htmlFor="fechanacimiento">Fecha de nacimiento</label>

                <input
                    id="fechanacimiento"
                    name="fechanacimiento"
                    type="date"
                    value={form.fechanacimiento}
                    className="form-control"
                    placeholder="fechanacimiento"
                    onChange={(e) => {calculate_Age(e);handleChange(e);}}
                    required
                    autoFocus
                    autoComplete="off"
                />
                {/* <inputError messages={errors.nombre} className="mt-2" /> */}
            </div>

            <div className="col-md-4">
                <label className="form-label" htmlFor="trabaja">Trabaja</label>
                <select
                    id="trabaja"
                    name="trabaja"
                    type="text"
                    value={form.trabaja}
                    className="form-control"
                    onChange={(e) => {handleChange(e);handleWork(e);}}
                    required
                    autoFocus
                    autoComplete="off"
                >
                <option value="">Seleccionar</option>
                <option value="0">No</option>
                <option value="1">Si</option>
                
                </select>

                {/* <inputError messages={errors.nombre} className="mt-2" /> */}
            </div>

        </div>

        <div className="row d-none" id="student_form">
            <div className="col-md-4">
            <label className="form-label" htmlFor="estudia">Estudias actualmente?</label>
                <select
                    id="estudia"
                    name="estudia"
                    type="text"
                    value={form.estudia}
                    className="form-control"
                    onChange={handleChange}
                    required
                    autoFocus
                    autoComplete="off"
                >
                <option value="0">No</option>
                <option value="1">Si</option>
                
                </select>
            </div>

            {/* <div className="col-md-4">
            <label className="form-label" htmlFor="grado_estudios">Grado de estudios</label>
                <select
                    id="grado_estudios"
                    name="grado_estudios"
                    type="text"
                    value={form.grado_estudios}
                    className="form-control"
                    onChange={handleChange}
                    required
                    autoFocus
                    autoComplete="off"
                >
                <option value="Primaria">Primaria</option>
                <option value="Secundaria">Secundaria</option>
                <option value="Preparatoria">Preparatoria</option>
                <option value="Carrera">Carrera</option>
                </select>
            </div> */}
        </div>

        <div className="row">
           <div className="col-md-4">
                <label className="form-label" htmlFor="nombre">Nombres</label>

                <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={form.nombre}
                    className="form-control"
                    placeholder="Nombres"
                    onChange={handleChange}
                    required
                    autoFocus
                    autoComplete="off"
                />

                {/* <inputError messages={errors.nombre} className="mt-2" /> */}
            </div>

            <div className="col-md-4">
                <label className="form-label" htmlFor="apaterno">Apellido paterno</label>

                <input
                    id="apaterno"
                    name="apaterno"
                    type="text"
                    value={form.apaterno}
                    className="form-control"
                    placeholder="Apellido paterno"
                    onChange={handleChange}
                    required
                    autoFocus
                    autoComplete="off"
                />

                {/* <inputError messages={errors.nombre} className="mt-2" /> */}
            </div>
            
            <div className="col-md-4">
                <label className="form-label" htmlFor="amaterno">Apellido materno</label>

                <input
                    id="amaterno"
                    name="amaterno"
                    type="text"
                    value={form.amaterno}
                    className="form-control"
                    placeholder="Apellido materno"
                    onChange={handleChange}
                    required
                    autoFocus
                    autoComplete="off"
                />

                {/* <inputError messages={errors.nombre} className="mt-2" /> */}
            </div>
        </div>

        <div className="row mt-3">
            <ListaIdioma form={form} handleChange={handleChange} list={ListIdioma}></ListaIdioma>
            <ListaEscolaridad form={form} handleChange={handleChange} list={ListEscolaridad}></ListaEscolaridad>
            <ListaOcupacion form={form} handleChange={handleChange} list={ListOcupacion}></ListaOcupacion>            
        </div>


        <div className="row">
          <div className="col-md-4">
              <label className="form-label" htmlFor="calle">Calle</label>

              <input
                  id="calle"
                  name="calle"
                  type="text"
                  value={form.calle}
                  className="form-control"
                  placeholder="calle"
                  onChange={handleChange}
                  required
                  autoFocus
                  autoComplete="off"
              />

              {/* <inputError messages={errors.nombre} className="mt-2" /> */}
          </div>

          <div className="col-md-4">
                <label className="form-label" htmlFor="numext">Numero exterior</label>

                <input
                    id="numext"
                    name="numext"
                    type="text"
                    value={form.numext}
                    className="form-control"
                    placeholder="numext"
                    onChange={handleChange}
                    required
                    autoFocus
                    autoComplete="off"
                />

                {/* <inputError messages={errors.nombre} className="mt-2" /> */}
            </div>
            <div className="col-md-4">
                <label className="form-label" htmlFor="numint">Numero interior</label>

                <input
                    id="numint"
                    name="numint"
                    type="text"
                    value={form.numint}
                    className="form-control"
                    placeholder="numint"
                    onChange={handleChange}
                
                    autoFocus
                    autoComplete="off"
                />

                {/* <inputError messages={errors.nombre} className="mt-2" /> */}
            </div>




        </div>

        <div className="row">
            <div className="col-md-4">
                <label className="form-label" htmlFor="primercruce">Calle 1</label>

                <input
                    id="primercruce"
                    name="primercruce"
                    type="text"
                    value={form.primercruce}
                    className="form-control"
                    placeholder="primercruce"
                    onChange={handleChange}
                    required
                    autoFocus
                    autoComplete="off"
                />

                {/* <inputError messages={errors.nombre} className="mt-2" /> */}
            </div>

            <div className="col-md-4">
                <label className="form-label" htmlFor="segundocruce">Calle 2</label>

                <input
                    id="segundocruce"
                    name="segundocruce"
                    type="text"
                    value={form.segundocruce}
                    className="form-control"
                    placeholder="segundocruce"
                    onChange={handleChange}
                    required
                    autoFocus
                    autoComplete="off"
                />

                {/* <inputError messages={errors.nombre} className="mt-2" /> */}
            </div>

            <ListaVivienda form={form} handleChange={handleChange} list={ListVivienda}></ListaVivienda>
        </div>

        <div className="row">

          <div className="col-md-4">
            <label className="form-label" htmlFor="municipio">Municipio</label>

            <select
                id="municipio"
                name="municipio"
                type="text"
                value={form.municipio}
                className="form-control"
                onChange={handleChange}
                required
                autoFocus
                autoComplete="off"
            >
                <option value="">Seleccionar</option>
                <option value="Zapopan">Zapopan</option>
                <option value="Guadalajara">Guadalajara</option>
                <option value="San Pedro Tlaquepaque">San Pedro Tlaquepaque</option>
                <option value="Tonala">Tonala</option>
                <option value="Tlajomulco de Zuñiga">Tlajomulco de Zuñiga</option>
                <option value="Zapotlanejo">Zapotlanejo</option>
                <option value="El Salto">El Salto</option>
                <option value="Acatlan de Juarez">Acatlan de Juarez</option>
                <option value="El Arenal">El Arenal</option>
                {/* <option value="">Seleccionar</option>
                <option value="ZAPOPAN">Zapopan</option>
                <option value="GUADALAJARA">Guadalajara</option>
                <option value="SAN PEDRO TLAQUEPAQUE">San Pedro Tlaquepaque</option>
                <option value="TONALA">Tonala</option>
                <option value="TLAJOMULCO DE ZUÑIGA">Tlajomulco de Zuñiga</option>
                <option value="ZAPOTLANEJO">Zapotlanejo</option>
                <option value="EL SALTO">El Salto</option>
                <option value="ACATLAN DE JUAREZ">Acatlan de Juarez</option>
                <option value="EL ARENAL">El Arenal</option> */}
            </select>

            {/* <inputError messages={errors.nombre} className="mt-2" /> */}
          </div>
            
          <div className="col-md-4">
                <label className="form-label" htmlFor="codigopostal">Código postal</label>

                <input
                    id="codigopostal"
                    name="codigopostal"
                    type="text"
                    value={form.codigopostal}
                    className="form-control"
                    placeholder="codigopostal"
                    onChange={(e) => {handleChange(e);fetchColonias(e)}}
                    required
                    autoFocus
                    autoComplete="off"
                />

                {/* <inputError messages={errors.nombre} className="mt-2" /> */}
            </div>

            <ListaCol form={form} handleChange={handleChange} list={list}/>

        </div>


        <div className="row">

        <div className="col-md-4">
                <label className="form-label" htmlFor="celular">celular</label>

                <input
                    id="celular"
                    name="celular"
                    type="number"
                    value={form.celular}
                    className="form-control"
                    placeholder="celular"
                    onChange={handleChange}
                    required
                    max={9999999999}
                    autoFocus
                    autoComplete="off"
                />

              {/* <inputError messages={errors.nombre} className="mt-2" /> */}
            </div>

            <ListaEstadoCivil  form={form} handleChange={handleChange} list={ListEstadoCivil}></ListaEstadoCivil>
            <div className="col-md-4">
                <label className="form-label" htmlFor="lugar_nacimiento">lugar Nacimiento</label>

                <input
                    id="lugar_nacimiento"
                    name="lugar_nacimiento"
                    type="text"
                    value={form.lugar_nacimiento}
                    className="form-control"
                    placeholder="Lugar de nacimiento"
                    onChange={handleChange}
                    required
                    autoFocus
                    autoComplete="off"
                />

                {/* <inputError messages={errors.nombre} className="mt-2" /> */}
            </div>

        </div>

        <div className="row">

            <ListaServiciosM form={form} handleChange={handleChange} list={ListServiciosM} /> 

            <ListaEnfermedad form={form} handleChange={handleChange} list={ListEnfermedad}/>

                
            <div className="col-md-4">
                <label className="form-label" htmlFor="enfermedad_otro">Otras enfermedades</label>

                <input
                    id="enfermedad_otro"
                    name="enfermedad_otro"
                    type="text"
                    value={form.enfermedad_otro}
                    className="form-control"
                    placeholder="enfermedad_otro"
                    onChange={handleChange}
                
                    autoFocus
                    autoComplete="off"
                />

                {/* <inputError messages={errors.nombre} className="mt-2" /> */}
            </div>
 

        </div>

        <div className="row">
           
            <div className="col-md-4">
                <label className="form-label" htmlFor="domicilio_trabajo">Domicilio trabajo</label>

                <input
                    id="domicilio_trabajo"
                    name="domicilio_trabajo"
                    type="text"
                    value={form.domicilio_trabajo}
                    className="form-control"
                    placeholder="domicilio_trabajo"
                    onChange={handleChange}
                    required
                    autoFocus
                    autoComplete="off"
                />

                {/* <inputError messages={errors.nombre} className="mt-2" /> */}
            </div>
            <div className="col-md-4">
                <label className="form-label" htmlFor="entrada_trabajo">Entrada trabajo</label>

                <input
                    id="entrada_trabajo"
                    name="entrada_trabajo"
                    type="time"
                    value={form.entrada_trabajo}
                    className="form-control"
                    placeholder="entrada_trabajo"
                    onChange={handleChange}
                    required
                    autoFocus
                    autoComplete="off"
                />

                {/* <inputError messages={errors.nombre} className="mt-2" /> */}
            </div>

            <div className="col-md-4">
                <label className="form-label" htmlFor="salida_trabajo">Salida trabajo</label>

                <input
                    id="salida_trabajo"
                    name="salida_trabajo"
                    type="time"
                    value={form.salida_trabajo}
                    className="form-control"
                    placeholder="salida_trabajo"
                    onChange={handleChange}
                    required
                    autoFocus
                    autoComplete="off"
                />

                {/* <inputError messages={errors.nombre} className="mt-2" /> */}
            </div>

            <div className="col-md-4">
                <label className="form-label" htmlFor="celular_trabajo">telefono trabajo</label>

                <input
                    id="telefono_trabajo"
                    name="telefono_trabajo"
                    type="number"
                    value={form.telefono_trabajo}
                    className="form-control"
                    placeholder="Teléfono trabajo"
                    onChange={handleChange}
                    required
                    autoFocus
                    max={9999999999}
                    autoComplete="off"
                />
                {/* <inputError messages={errors.nombre} className="mt-2" /> */}
            </div>
        </div>
            <div className="flex items-center justify-end mt-4">
                <button className="ml-4 btn btn-success">Guardar</button>
            </div>

        </form>
        <CustomModal open={openModal} onClose={close} message={message} aceptar={()=>setOpenModal(false)} />
    </div>
    
  )
}
