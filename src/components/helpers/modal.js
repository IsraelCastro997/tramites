export default function Modal({open,onClose,submitForm}) {
    if (!open.status) return null
  return (
    <div className="overlay">
        <div className="modalContainer">
            {/* <img className="imgModal" src="../logo/Logo_DIF.png"></img> */}
            <div className="modalRight">
                <p className="closeBtn" onClick={onClose}>X</p>
                <div className="modalContent">
                    <h2>
                    Estas seguro de liberar estos cupos? esta accion no podra ser revertida.
                    </h2>
                    <div >
                        <button className="btn btn-sm btn-success" onClick={()=>{submitForm(open.id)}}>Si, Liberar</button> <button className="btn btn-sm btn-danger" onClick={onClose}>No</button>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
  )
}
