import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import React, { useEffect, useState } from 'react'
// import { click } from '@testing-library/user-event/dist/click'
import Modal from './modal'
import AuthUser from '../../auth/AuthUser'

export default function Calendar() {

  const {http} = AuthUser();
  const [stateCalendar, setStateCalendar] = useState([])

  const [form,setForm] = useState( {
    title: "guarderia",
    start: '',
    end:'',
    solicitud_id:'',
});

  const [openModal,setOpenModal] = useState({
    status: false, 
    text:"",
    id: "",
    solicitudes:{},
    event: {}
  },[]);

  useEffect(()=> {
    fetchData()
  },[]);

async function fetchData(){
 
  try {
    const response = await http.get('agenda/');
    console.log(response);

    let events = response.data.datos.filter(elemento => elemento.agenda!==null).map(elemento => elemento.agenda)
    let solicitudes = response.data.datos.filter(elemento => elemento.agenda === null)

    setOpenModal({solicitudes:solicitudes})
    console.log(events)
    setStateCalendar(events);
  
  }catch (error) {
    console.log(error);
  }
  
}

const handleEventClick = (clickInfo) => {
  
  let dateStart = new Date(clickInfo.event.startStr);
  let dateEnd =  new Date(dateStart)

  dateStart.setMinutes(dateStart.getMinutes() - 360)
  dateEnd.setMinutes(dateStart.getMinutes() - 300)
  dateStart = dateStart.toISOString().slice(0, 19).replace('T', ' ')
  dateEnd = dateEnd.toISOString().slice(0, 19).replace('T', ' ')

  setForm({
    title: "guarderia",
    start: dateStart,
    end: dateEnd,
    solicitud_id:clickInfo.event.extendedProps.solicitud.id,
  })

   setOpenModal({...openModal, status:true,id:"",text:"Editar Cita "+clickInfo.event.id,event:clickInfo.event})  
}

const handleDateSelect = (selectInfo) => {
  console.log(form)
  setOpenModal({...openModal, status:true,id:"",text:"Agendar cita",event:selectInfo})  
 
}

async function submitForm(method,id,form){ 

  if (method === "POST") {
    console.log(form)
    try {
      const response = await http({
        method: method,
        url:'http://localhost:8000/api/agenda/',
        data:form
      });

      let calendarApi = openModal.event.view.calendar
      console.log(openModal.event.view.calendar);
  
      calendarApi.unselect() // clear date selection
  
      setOpenModal({...openModal, status:false})
  
      fetchData()
    }catch (error) {
      console.log(error);
    }
  }else{
    console.log(form)
   

    const response = await http({
      method: method,
      url:'http://localhost:8000/api/agenda/'+id,
      data:form
    });
    console.log(response);

    setOpenModal({...openModal, status:false})

    fetchData()
  }
  

}

  function renderEventContent(eventInfo) {
    // console.log(eventInfo.event.extendedProps)
    return <div>
        {/* <b>{eventInfo.timeText} </b> */}
        <b>{eventInfo.event.id} </b>
        <i>{eventInfo.event.title}</i>
    </div>
  }

  function renderSidebarEvent(event) {
   
    return (
      <li className='list-group-item' key={event.id}>
        <b>{formatDate(event.start, {year: 'numeric', month: 'numeric', day: 'numeric',hour:'numeric',minute:'numeric'})}</b>
         <a href={event.id} className="text-decoration-none text-secondary ms-2"><i className='fw-bold'>{event.title}</i></a>
      </li>
    )
  }

  function renderSidebar() {
  
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
        </div>
        <div className='demo-app-sidebar-section'>
        </div>
        <div className='demo-app-sidebar-section'>
          <h4>Agenda ({stateCalendar.length})</h4>
          <ul className='list-group'>
            {stateCalendar?.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }
  
  function RenderCalendar(){
    // console.log(stateCalendar);
    if (!stateCalendar) {
      return <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
    }
    else{
      return <div className='demo-app'>
      {renderSidebar()}
      <div className='demo-app-main'>
        <FullCalendar locale={esLocale}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          eventTimeFormat={ { // like '14:30:00'
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={false}
          initialEvents={stateCalendar} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </div>
    </div>
    
    }
  }

  return (
    <div>
      <Modal open={openModal} form={form} setForm={setForm} submitForm={submitForm} agenda={true} onClose={()=> setOpenModal({...openModal,status:false})}></Modal>
      <RenderCalendar></RenderCalendar>
    </div>
  )


}



