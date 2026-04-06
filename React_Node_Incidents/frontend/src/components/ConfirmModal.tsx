interface Props {
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({ onConfirm, onCancel }: Props) {
    return (
        <div
            className="modal show fade d-block"
            style={{ backgroundColor: "rgba(0,0,0,.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Confirmar eliminacion</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onCancel}
                        />
                    </div>

                    <div className="modal-body">
                        <p>Seguro que desea eliminar este incidente?</p>
                    </div>

                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={onCancel}
                        >
                            Cancelar
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={onConfirm}
                        >
                            Eliminar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
