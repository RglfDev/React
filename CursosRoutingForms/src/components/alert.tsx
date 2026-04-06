interface AlertProps {
    message: string;
    type: 'success' | 'danger';
    isOpen: boolean;
}

//Componente de alerta que muestra un mensaje dinámico basado en las props recibidas. No tiene mucho mas...
function Alert({ message, type, isOpen }: AlertProps) {
    if (!isOpen) return null;
    return (
        <div className={`alert alert-${type} alert-dismissible fade show`}>
            {message}
        </div>
    );
}

export default Alert;