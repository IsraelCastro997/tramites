export default function ListaOcupacion(props) {
  
    function renderElement(){
  
        if (props.list) {
          return (
            <select
                id="ocupacion"
                name="ocupacion"
                type="text"
                value={props.form.ocupacion}
                className="form-control"
                onChange={props.handleChange}
                required
                autoFocus
                autoComplete="off"
            > 
              <option key="0" value="">Seleccionar</option>
              {Object.values(props.list).map((elemento) => (
                <option key={elemento.id} value={elemento.id}>
                  {elemento.ocupacion}
                </option>
              ))}
            </select>
         
        );
        }else{
            return (
                <select
                id="ocupacion"
                name="ocupacion"
                type="text"
                value={props.form.ocupacion}
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
        <label className="form-label" htmlFor="ocupacion">Ocupación</label>
            {renderElement()}
        </div>
  )
}
