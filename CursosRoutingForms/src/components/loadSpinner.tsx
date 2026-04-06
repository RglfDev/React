interface SpinnerProps {
    message?: string;
}

//Componente de carga con spinner y mensaje opcional. Si no se pasa mensaje, muestra "Cargando..." por defecto.
function LoadSpinner({ message = "Cargando..." }: SpinnerProps) {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center my-5">
            <div className="spinner-border text-primary">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="visually-hidden">{message}</p>
            {message && <p className="text-secondary font-weight-bold">{message}</p>}
        </div>
    );
}

export default LoadSpinner;