import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import AuthUser from "../auth/AuthUser";
import CustomModal from "../helpers/customModal";

export default function Documentacion({ infante, madre, padre, sala_guarderia, documentacion, formData, formNew = true, }) {
    let { id } = useParams();
    const { files } = AuthUser();
    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState({
        open: false,
        message: "",
        onClose: () => setOpenModal({ ...openModal, open: false })
    });

    const [archivos, setArchivos] = useState({
        actaInfante: '',
        constanciaTrabajo: '',
        documento3: '',
    });

    // useEffect(() => {
    //     if (id || formNew == true){
    //         fetchDetail();
    //     }
    //     else{
    //         fetchMe()
    //     }
    // }, [id]);
    const handleChange = e => {

        const { name } = e.target
        setArchivos({
            ...archivos,
            [name]: e.target.files[0]
        });
        console.log(archivos)
    }

    const insertarArchivos = async (e) => {
        e.preventDefault()
        const f = new FormData();
        const padreForm = JSON.parse(padre)
        const madreForm = JSON.parse(madre)
        const infanteForm = JSON.parse(infante)
        const salaForm = JSON.parse(sala_guarderia)

        f.append("actaInfante", archivos.actaInfante);
        f.append("constanciaTrabajo", archivos.constanciaTrabajo);
        f.append("documento3", archivos.documento3);

        Object.entries(padreForm).map(([key, value]) =>
            f.append(`padre[${key}]`, value)
        );

        Object.entries(madreForm).map(([key, value]) =>
            f.append(`madre[${key}]`, value)
        );

        Object.entries(infanteForm).map(([key, value]) =>
            f.append(`infante[${key}]`, value)
        );

        Object.entries(salaForm).map(([key, value]) =>
            f.append(`sala_guarderia[${key}]`, value)
        );

        try {
            const res = await files.post('post-solicitud', f, { responseType: 'blob' });

            if (!res) {
                setOpenModal({ open: true, message: 'error al hacer la solicitud contacte con el administrador', onClose: () => setOpenModal({ ...openModal, open: false }) })
            } else {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'constancia.pdf')
                document.body.appendChild(link);
                link.click();
                setOpenModal({ open: true, message: 'Solicitud enviada con exito, se ha descargado con los datos de la cita.', onClose: () => navigate('/') })
            }
        } catch (error) {
            setOpenModal({ open: true, message: 'error al hacer la solicitud contacte con el administrador', onClose: () => setOpenModal({ ...openModal, open: false }) })
        }
    }

    return (
        <>
        <h2>Documentos requeridos en el tramite</h2>
        <form onSubmit={insertarArchivos} className="w-full max-w-md">
            <div className="col-sm-12">
                <div className="card p-4">
                    <div className="card-body">

                        <div className="mb-3">
                            <label className="form-label">Acta del infante: </label>
                            <input type="file" name="actaInfante" id="actaInfante" className="form-control" onChange={(e) => handleChange(e)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Constancia Trabajo: </label>
                            <input type="file" name="constanciaTrabajo" id="constanciaTrabajo" className="form-control" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Documento 3: </label>
                            <input type="file" name="documento3" id="documento3" className="form-control" onChange={(e) => handleChange(e)} />
                        </div>

                        {madre || infante || documentacion ? <div className="flex items-center justify-end mt-4">
                            <button className="ml-4 btn btn-success">Guardar</button>
                        </div> : null}

                    </div>
                </div>
            </div>
        </form>
        <CustomModal open={openModal.open} onClose={openModal.onClose} message={openModal.message} />
        </>
    )
}
