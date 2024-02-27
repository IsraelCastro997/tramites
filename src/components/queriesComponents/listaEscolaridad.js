export default function ListaEscolaridad(props) {
    function renderElement(){
  
        if (props.list) {
          return (
            <select
                id="escolaridad"
                name="escolaridad"
                type="text"
                value={props.form.escolaridad}
                className="form-control"
                onChange={props.handleChange}
                required
                autoFocus
                autoComplete="off"
            > 
              <option key="0" value="">Seleccionar</option>
              {Object.values(props.list).map((elemento) => (
                <option key={elemento.id} value={elemento.id}>
                  {elemento.escolaridad}
                </option>
              ))}
            </select>
         
        );
        }else{
            return (
                <select
                id="escolaridad"
                name="escolaridad"
                type="text"
                value={props.form.escolaridad}
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
        <label className="form-label" htmlFor="escolaridad">Escolaridad</label>
            {renderElement()}
        </div>
  )
}
