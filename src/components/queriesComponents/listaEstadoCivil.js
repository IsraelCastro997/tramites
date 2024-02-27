export default function ListaEstadoCivil(props) {
    function renderElement(){
  
        if (props.list) {
          return (
            <select
                id="estado_civil"
                name="estado_civil"
                type="text"
                value={props.form.estado_civil}
                className="form-control"
                onChange={props.handleChange}
                required
                autoFocus
                autoComplete="off"
            > 
              <option key="0" value="">Seleccionar</option>
              {Object.values(props.list).map((elemento) => (
                <option key={elemento.id} value={elemento.id}>
                  {elemento.estado_civil}
                </option>
              ))}
            </select>
         
        );
        }else{
            return (
                <select
                id="estado_civil"
                name="estado_civil"
                type="text"
                value={props.form.estado_civil}
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
        <label className="form-label" htmlFor="estado_civil">Estado civil</label>
            {renderElement()}
        </div>
  )
}
