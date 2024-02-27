export default function ListaVivienda(props) {
    function renderElement(){
  
        if (props.list) {
          return (
            <select
                id="vivienda"
                name="vivienda"
                type="text"
                value={props.form.vivienda}
                className="form-control"
                onChange={props.handleChange}
                required
                autoFocus
                autoComplete="off"
            > 
              <option key="0" value="">Seleccionar</option>
              {Object.values(props.list).map((elemento) => (
                <option key={elemento.id} value={elemento.id}>
                  {elemento.vivienda}
                </option>
              ))}
            </select>
         
        );
        }else{
            return (
                <select
                id="vivienda"
                name="vivienda"
                type="text"
                value={props.form.vivienda}
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
        <label className="form-label" htmlFor="vivienda">Vivienda</label>
            {renderElement()}
        </div>
  )
}
