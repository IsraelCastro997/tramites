export default function ListaEnfermedad(props) {

    function renderElement(){
        if (props.list) {
        
          return (
            <select
              id="enfermedad"
              name="enfermedad"
              type="text"
              value={props.form.enfermedad}
              className="form-control"
              onChange={props.handleChange}
              required
              autoFocus
              autoComplete="off"
            > 
              <option key="0" value="">Seleccionar</option>
              {Object.values(props.list).map((elemento) => (
                <option key={elemento.id} value={elemento.id}>
                  {elemento.enfermedad}
                </option>
              ))}
            </select>
         
        );
        }else{
            return (
              <select

                id="enfermedad"
                name="enfermedad"
                type="text"
                value={props.form.enfermedad}
                className="form-control"
                placeholder="enfermedad"
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
        <label className="form-label" htmlFor="enfermedad">Enfermedad</label>
            {renderElement()}
        </div>
  )

}
