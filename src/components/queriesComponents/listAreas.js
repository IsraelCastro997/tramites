export default function Listarea_id(props) {

    function renderElement(){
        if (props.list) {
        
          return (
            <select
              id="area_id"
              name="area_id"
              type="text"
              value={props.form.area_id}
              className="form-control"
              onChange={props.handleChange}
              required
              autoFocus
              autoComplete="off"
            > 
              <option key="0" value="">Seleccionar</option>
              {Object.values(props.list).map((elemento) => (
                <option key={elemento.id} value={elemento.id}>
                  {elemento.tramite + " " + elemento.area.centro}
                </option>
              ))}
            </select>
         
        );
        }else{
            return (
              <select

                id="area_id"
                name="area_id"
                type="text"
                value={props.form.area_id}
                className="form-control"
                placeholder="area_id"
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
        <label className="form-label" htmlFor="area_id">area</label>
            {renderElement()}
        </div>
  )

}
