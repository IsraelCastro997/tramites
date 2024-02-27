export default function ListaGuarderia(props) {
    function renderElement(){
        if (props.list) {
          return (
            <select
                id="guarderia"
                name="guarderia"
                type="text"
                value={props.form.guarderia}
                className="form-control"
                onChange={props.handleChange}
                required
                autoFocus
                autoComplete="off"
            > 
              <option key="0" value="">Seleccionar</option>
              {Object.values(props.list).map((elemento) => (
                <option key={elemento.id} value={elemento.id}>
                  {elemento.nombre}
                </option>
              ))}
            </select>
         
        );
        }else{
            return (
                <select

                id="guarderia"
                name="guarderia"
                type="text"
                value={props.form.guarderia}
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
        <label className="form-label" htmlFor="guarderia">Guarderia</label>
            {renderElement()}
        </div>
  )

}
