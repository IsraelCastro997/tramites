export default function ListaIdioma(props) {
    function renderElement(){
  
        if (props.list) {
          return (
            <select
                id="lenguamaterna"
                name="lenguamaterna"
                type="text"
                value={props.form.lenguamaterna}
                className="form-control"
                onChange={props.handleChange}
                required
                autoFocus
                autoComplete="off"
            > 
              <option key="0" value="">Seleccionar</option>
              {Object.values(props.list).map((elemento) => (
                <option key={elemento.id} value={elemento.id}>
                  {elemento.idioma}
                </option>
              ))}
            </select>
         
        );
        }else{
            return (
                <select
                id="lenguamaterna"
                name="lenguamaterna"
                type="text"
                value={props.form.lenguamaterna}
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
        <label className="form-label" htmlFor="lenguamaterna">Lengua materna</label>
            {renderElement()}
        </div>
  )
}
