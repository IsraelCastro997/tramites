export default function ListaCol(props) {

  function renderElement(){
  
    if (props.list) {
      return (
          <select
        id="colonia"
        name="colonia"
        type="text"
        value={props.form.colonia}
        className="form-control"
        onChange={props.handleChange}
        required
        autoFocus
        autoComplete="off"
        > 
          <option key="0" value="">Seleccionar</option>
          {Object.values(props.list).map((elemento) => (
            <option key={elemento.id} value={elemento.id}>
              {elemento.colonia}
            </option>
          ))}
        </select>
     
    );
    }else{
      return (
        <select
        id="colonia"
        name="colonia"
        type="text"
        value={props.form.colonia}
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
     <label className="form-label" htmlFor="colonial">Colonia</label>
     {renderElement()}
     </div>
  )
}
