export default function ListaServiciosM(props) {
    function renderElement(){
  
        if (props.list) {
          return (
            <select
                id="serviciosmedicos"
                name="serviciosmedicos"
                type="text"
                value={props.form.serviciosmedicos}
                className="form-control"
                onChange={props.handleChange}
                required
                autoFocus
                autoComplete="off"
            > 
              <option key="0" value="">Seleccionar</option>
              {Object.values(props.list).map((elemento) => (
                <option key={elemento.id} value={elemento.id}>
                  {elemento.servicios_medicos}
                </option>
              ))}
            </select>
         
        );
        }else{
            return (
                <select
                id="serviciosmedicos"
                name="serviciosmedicos"
                type="text"
                value={props.form.servicios_medicos}
                className="form-control"
                onChange={props.handleChange}
                required
                autoFocus
                autoComplete="off"
                > 
                </select>
            )
         
        }
    }

    return (
        <div className="col-md-4">
        <label className="form-label" htmlFor="serviciosmedicos">Servicios medicos</label>
            {renderElement()}
        </div>
  )
}
