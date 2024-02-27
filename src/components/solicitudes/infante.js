import { useEffect, useState } from 'react'
import AuthUser from "../auth/AuthUser";
import { useNavigate, useParams } from "react-router-dom";
import ListaCol from "../queriesComponents/listaCol";
import { fetchCurp } from "../helpers/fetchCurp";
import ListaEnfermedad from '../queriesComponents/listaEnfermedad';
import ListaVivienda from '../queriesComponents/listaVivienda';
import ListaServiciosM from '../queriesComponents/listaServiciosM';
import ListaIdioma from '../queriesComponents/listaIdioma';
import ListaEscolaridad from '../queriesComponents/listaEscolaridad';
import { calculate_age } from "../helpers/calculateAge";
import CustomModal from '../helpers/customModal';

export default function Infante(props) {
    const { url, formNewUser } = props;
    const [openModal, setOpenModal] = useState(true);
    const navigate = useNavigate();
    const [close, setClose] = useState()
    const [message, setMessage] = useState("Ingrese los datos del infante");
    let { http } = AuthUser();
    let { id } = useParams();

    const [list, setList] = useState([]);
    const [ListEnfermedad, setListEnfermedad] = useState([]);
    const [ListIdioma, setListIdioma] = useState([]);
    const [ListVivienda, setListVivienda] = useState([]);
    const [ListEscolaridad, setListEscolaridad] = useState([]);
    const [ListServiciosM, setListServiciosM] = useState([]);

    const [form, setForm] = useState({
        curp: '',
        nombre: '',
        apaterno: '',
        amaterno: '',
        fechanacimiento: '',
        edad: 0,
        escolaridad: '',
        calle: '',
        numext: '',
        numint: '',
        primercruce: '',
        segundocruce: '',
        codigopostal: '',
        municipio: '',
        colonia: '',
        vivienda: '',
        sexo: '',
        tipo_sangre: '',
        lenguamaterna: '',
        serviciosmedicos: '',
        celular: '',
        hermanos_en_CDI: 0,
        edades_hermanos: '',
        nombres_hermanos: '',
        tipo_hermanos: '',
        enfermedad: '',
        enfermedad_otro: '',

    })

    async function calculate_Age(e) {

        const res = await calculate_age(e);

        setTimeout(() => {
            console.log(res)
            setForm({
                // ...form,
                edad: res
            })
        }, 1000);
    }

    useEffect(() => {

        fetchCatalogos()
        if (localStorage.getItem("infante")) {

            const infante = JSON.parse(localStorage.getItem("infante"));
            fetchColonias(infante.codigopostal);
            setForm(infante);
        }
        if (id !== "undefined") {
            fetchDetail();
        }

    }, [id]);


    async function fetchDetail() {
        try {
            let response = {};

            response = await http.get('get-infante/' + id);

            fetchColonias(response.data.infante.codigopostal);
            setForm(response.data.infante);
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchCatalogos() {
        try {
            const response = await http.get('http://datac.difzapopan.gob.mx/api-servicios/public/api/data/catalogos');
            setListEnfermedad(response.data.enfermedad);
            setListVivienda(response.data.vivienda);
            setListServiciosM(response.data.serviciosmedicos);
            setListEscolaridad(response.data.escolaridad);
            setListIdioma(response.data.idioma);

        } catch (error) {
            console.log(error);
        }
    }

    // CABI940512HJCSCS06
    // HECB000817HMNRSNA5
    async function curp(e) {
        await fetchCurp(form, setForm, http, e, fetchColonias, calculate_age);
    }

    async function fetchColonias(e) {

        let { value } = ""
        if (!e.target) {
            value = e
        } else {
            value = e.target.value
        }

        try {

            const response = await http.get('http://datac.difzapopan.gob.mx/api-servicios/public/api/data/colonias/' + value);

            setList(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const putData = async (form) => {

        try {

            const res = await http.put(url + id, form);
            const data = await res.data;

            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key];
                    setMessage(oldMessage => [
                        ...oldMessage,
                        { message: error.message }
                    ])
                }
            }
            else {
                setClose(() => navigate('/solicitud-guarderia'))
            }

        } catch (error) {
            console.log(error);
        }

    }

    const postData = () => {
        localStorage.setItem('infante', JSON.stringify(form));
        setClose(() => navigate('/register-madre/undefined'))
        setMessage('Operacion Realizada Con Exito')
        setOpenModal(true)
       

    }

    const handleChange = e => {

        const { value, name } = e.target

        setForm({
            ...form,
            [name]: value
        })

    }

    const handleSubmit = e => {
        e.preventDefault()
        if (formNewUser) {
            postData(form)
        } else {
            putData(form)
        }
    }

    return (

        <div className="container-fluid">

            {formNewUser ? <h1 >  Agregar Infante</h1> : <h1 >  Actualizar Infante</h1>}

            <form onSubmit={handleSubmit} className="w-full max-w-lg">

                <div className='row'>

                    <div className="col-md-4">
                        <label className="form-label" htmlFor="curp">Curp</label>

                        <input
                            id="curp"
                            name="curp"
                            type="text"
                            value={form.curp}
                            className="form-control"
                            placeholder="Curp"
                            onChange={(e) => { curp(e); handleChange(e); }}
                            required
                            maxLength={18}
                            autoFocus
                            autoComplete="off"
                        />

                    </div>
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

                    </div>

                    <div className="col-md-4 ">
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

                    </div>
                </div>


                <div className="row mt-3">

                    <div className="col-md-4">
                        <label className="form-label" htmlFor="fechanacimiento">Fecha de nacimiento</label>

                        <input
                            id="fechanacimiento"
                            name="fechanacimiento"
                            type="date"
                            value={form.fechanacimiento}
                            className="form-control"
                            placeholder="fechanacimiento"
                            onChange={(e) => { handleChange(e); calculate_Age(e); }}
                            required
                            autoFocus
                            autoComplete="off"
                        />

                    </div>
                    <div className="col-md-4">
                        <label className="form-label" htmlFor="edad">Edad</label>
                        <input
                            id="edad"
                            name="edad"
                            type="text"
                            onChange={handleChange}
                            value={form.edad}
                            className="form-control"
                            placeholder="edad"
                            required
                            autoFocus
                            maxLength={2}
                            autoComplete="off"
                        />

                    </div>
                    <div className="col-md-4">
                        <label className="form-label" htmlFor="tipo_sangre">tipo Sangre</label>

                        <input
                            id="tipo_sangre"
                            name="tipo_sangre"
                            type="text"
                            value={form.tipo_sangre}
                            className="form-control"
                            placeholder="tipo_sangre"
                            onChange={handleChange}
                            required
                            autoFocus
                            autoComplete="off"
                        />

                    </div>
                </div>

                <div className='row'>
                    <ListaIdioma form={form} handleChange={handleChange} list={ListIdioma}></ListaIdioma>
                    <ListaEscolaridad form={form} handleChange={handleChange} list={ListEscolaridad}></ListaEscolaridad>
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

                    </div>
                </div>

                <div className='row'>
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
                        </select>

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
                            onChange={(e) => { handleChange(e); fetchColonias(e) }}
                            required
                            autoFocus
                            autoComplete="off"
                        />

                    </div>

                    <ListaCol form={form} handleChange={handleChange} list={list} />

                </div>


                <div className="row">

                    <div className="col-md-4">
                        <label className="form-label" htmlFor="celular">Celular</label>

                        <input
                            id="celular"
                            name="celular"
                            type="number"
                            value={form.celular}
                            className="form-control"
                            placeholder="teléfono"
                            onChange={handleChange}
                            required
                            maxLength={10}
                            autoFocus
                            autoComplete="off"
                        />

                    </div>

                    <div className="col-md-4">
                        <label className="form-label" htmlFor="sexo">sexo</label>

                        <select
                            id="sexo"
                            name="sexo"
                            type="text"
                            value={form.sexo}
                            className="form-control"
                            onChange={handleChange}
                            required
                            autoFocus
                            autoComplete="off"
                        >
                            <option value="">Seleccionar</option>
                            <option value="1">Hombre</option>
                            <option value="2">Mujer</option>
                        </select>

                    </div>

                </div>

                <div className='row'>
                    <ListaServiciosM form={form} handleChange={handleChange} list={ListServiciosM}></ListaServiciosM>

                    <ListaEnfermedad form={form} handleChange={handleChange} list={ListEnfermedad} />

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

                    </div>
                </div>

                <div className="row ">
                    <div className="col-md-4">
                        <label className="form-label" htmlFor="hermanos_en_CDI">Hermanos en CDI</label>
                        <select
                            id="hermanos_en_CDI"
                            name="hermanos_en_CDI"
                            type="text"
                            value={form.hermanos_en_CDI}
                            className="form-control"
                            placeholder="hermanos_en_CDI"
                            onChange={handleChange}
                            autoFocus
                            autoComplete="off"
                        >
                            <option value="0">No</option>
                            <option value="1">Si</option>
                        </select>

                    </div>
                    <div className="col-md-4">
                        <label className="form-label" htmlFor="nombres_hermanos">Nombres hermanos</label>

                        <input
                            id="nombres_hermanos"
                            name="nombres_hermanos"
                            type="text"
                            value={form.nombres_hermanos}
                            className="form-control"
                            placeholder="nombres_hermanos"
                            onChange={handleChange}
                            autoFocus
                            autoComplete="off"
                        />

                    </div>

                    <div className="col-md-4">
                        <label className="form-label" htmlFor="edades_hermanos">edades_hermanos</label>

                        <input
                            id="edades_hermanos"
                            name="edades_hermanos"
                            type="text"
                            value={form.edades_hermanos}
                            className="form-control"
                            placeholder="nombres_hermanos"
                            onChange={handleChange}
                            autoFocus
                            autoComplete="off"
                        />

                    </div>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <button className="ml-4 btn btn-success">Guardar</button>
                </div>

            </form>
            <CustomModal open={openModal} onClose={()=> setOpenModal(false)} message={message} />
        </div>
    )
}
