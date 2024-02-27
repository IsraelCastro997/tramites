
import './modal.css';
import { formatDate } from '@fullcalendar/react'
export default function Modal({open,onClose,submitForm,form,setForm}) {

    const handleChange = (e) => {

        let {value} = e.target

        let dateStart = new Date(open.event.startStr + " " +value+":00+0600");
       
        let dateEnd =  new Date(dateStart)

        dateEnd.setMinutes(dateStart.getMinutes() + 60)

        dateStart = dateStart.toISOString().slice(0, 19).replace('T', ' ')
        dateEnd = dateEnd.toISOString().slice(0, 19).replace('T', ' ')

        const solicitud_id =  document.getElementById('solicitud_id').value;

        console.log(form)

        setForm({
            ...form,
            start: dateStart,
            end: dateEnd,
            solicitud_id: solicitud_id,
        })
      }

    function setSolicitud() {
        const solicitud_id =  document.getElementById('solicitud_id').value;
        setForm({
            ...form,
            solicitud_id: solicitud_id,
        })
    }

    function updateForm(e){

        let start;
        let end;
        console.log(e.target.value)
        end = new Date(e.target.value); // Converted to UTC Time Zone
        start = new Date(e.target.value);
        start.setHours(end.getHours() - 12);
        end.setHours(end.getHours() - 11);
        start = start.toISOString().slice(0, 19).replace('T', ' ')
        end = end.toISOString().slice(0, 19).replace('T', ' ')
      
        setForm({...form,start:start,end: end})
       
    }


    function agendaForm() {
        return <div className="mb-3">
               
            {
            !open.event.extendedProps ?
            <div className="mb-3">
            <p><b>{formatDate(open.event.start, {year: 'numeric', month: 'short', day: 'numeric',hour:'numeric',minute:'numeric'}) }</b></p>
            <label htmlFor='solicitud_id' className="form-label">Solicitud</label>
            <select className="form-select form-select-lg" name="solicitud_id"  id="solicitud_id" onChange={setSolicitud}> 
                <option value=''>Seleccionar solicitud</option>
                {Object.values(open.solicitudes).map((elemento) => (
                    <option key={elemento.id} value={elemento.id}>
                    {elemento.id}
                    </option>
                ))}
            </select>
            <label htmlFor="start" className="form-label">Hora</label>
            <input type="time"
                className="form-control"
                name="start"
                id="start"
                // value={open.event.start}
                onChange={handleChange}
            />
                <div >
                <button className="btn btn-sm btn-success" onClick={()=>{submitForm('POST',open.id,form)}}>Si</button> <button className="btn btn-sm btn-danger" onClick={onClose}>No</button>
                </div>
            </div> :  <div className="mb-3">
            <label htmlFor="start" className="form-label">Hora</label>
            <input type="datetime-local"
                className="form-control"
                name="start"
                id="start"
                // value={open.event.start}
                onChange={(e)=> updateForm(e)}
            />    
                <div className='mt-3'>
                    <button className="btn btn-sm btn-success" onClick={()=>{submitForm('PUT',open.event.id,form)}}>Si</button> <button className="btn btn-sm btn-info" onClick={onClose}>No</button>   <button className="btn btn-sm btn-danger" onClick={()=>{submitForm('DELETE',open.event.id,form)}}>Eliminar</button>
                </div>
            </div>}
        </div>
     
    }

    if (!open.status) return null
    return (
        <div className="overlay">
            <div className="modalContainer">
                <div className="modalRight">
                    <p className="closeBtn" onClick={onClose}>X</p>
                    <div className="modalContent">
                        <h2 className='mb-3'>{open.text}</h2>
                        {agendaForm()}
                    </div>
                </div>
            </div>
        </div>
    )
}
