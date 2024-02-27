export default function ListGuarderiaSala(props) {
    function renderElement(){
        if (props.list) {
          return (
            <select
                id="sala_g_id"
                name="sala_g_id"
                type="text"
                value={props.form.sala_g_id}
                className="form-control"
                onChange={props.handleChange}
                required
                autoFocus
                autoComplete="off"
            > 
              <option key="0" value="">Seleccionar</option>
              {Object.values(props.list).map((elemento) => (
                <option key={elemento.id} value={elemento.id}>
                  {elemento.guarderia.centro + "-" + elemento.sala}
                </option>
              ))}
            </select>
         
        );
        }else{
            return (
                <select
                    id="sala_g_id"
                    name="sala_g_id"
                    type="text"
                    value={props.form.sala_g_id}
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

        <div className="col-md-6">
        <label className="form-label" htmlFor="sala_g_id">Seleccione la guardería y la sala a la que quiere hacer el trámite</label>
            {renderElement()}
        </div>
  )

}
