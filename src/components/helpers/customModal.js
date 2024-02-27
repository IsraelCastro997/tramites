export default function CustomModal({open,onClose,message, aceptar = onClose}) {
  
    if (!open) return null
  return (  
    <div className="overlay">
        <div className="modalContainer">
            <div className="modalRight">
                <p className="closeBtn" onClick={onClose}>X</p>
                <div className="modalContent">
                    <h2>
                        {message}
                    </h2>
                    <div>
                        <button className="btn btn-sm btn-success" onClick={aceptar}>Aceptar</button>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}
 