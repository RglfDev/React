interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}
//El componente del modal de confirmacion. Si isOpen es false, no se renderiza nada.
//Si es true, se muestra el modal con el título, mensaje y botones de aceptar y cancelar.
//Al hacer click en aceptar, se ejecuta la función onConfirm pasada por props.
//Al hacer click en cancelar o en la X, se ejecuta la función onCancel pasada por props.
//He tenido que poner el estilo zIndex para que se muestre por encima de todo el contenido ya que si no se me quedaba atras y no se veia.
const ModalConfirm = ({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) => {
    if (!isOpen) return null;

     return (  
    <>  
      <div  
           className="modal fade show d-block" 
           style={{ zIndex: 1060 }}
           role="dialog"
      >  
        <div className="modal-dialog modal-dialog-centered">  
          <div className="modal-content shadow-lg">  
            <div className="modal-header bg-dark text-white">  
              <h5 className="modal-title">{title}</h5>  
              <button  
                type="button"  
                className="btn-close btn-close-white"  
                onClick={onCancel}  
              ></button>  
            </div>  
            <div className="modal-body">  
              <p>{message}</p>  
            </div>  
            <div className="modal-footer">  
              <button  
                type="button"  
                className="btn btn-outline-secondary"  
                onClick={onCancel}  
              >  
                Cancelar  
              </button>  
              <button 
                type="button"  
                className="btn btn-primary"  
                onClick={onConfirm}>  
                Aceptar  
              </button>  
            </div>  
          </div>  
        </div>  
      </div>  
      <div className="modal-backdrop fade show" style={{ zIndex: 1055 }}></div>  
    </>  
  );  
};  
export default ModalConfirm; 