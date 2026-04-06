
import type { Student, StudentContextType } from "../types/Student";
import ModalConfirm from "../components/modalConfirm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import React from "react";

//IMPORTANTE: he de decir que he estado trabajando este fin de semana para conseguir integrar un Modal de confirmacion en el contexto
//de cada modelo para asi poder reutilizarlo en cualquier accion que se lleve a cabo dentro de ellos (la que sea necesaria).
//Despues de las dudas del viernes, y despues de muchos intentos creo que he conseguido dominarlo, aunque seguramente el contexto no este
// tan bien optimizado como deberia.
//A continuacion te explico como funciona:

//Añadido el ultimo punto de los extras: Ahora los datos se guardan en el LocalStorage del navegador, tanto para estudiantes como para cursos,
//mediante un Hook personalizado llamado useLocalStorage que gestiona la lectura y escritura en el LocalStorage.
//De esta manera, los datos persisten entre recargas de la página. Antes se recogian de la carpeta data, pero como ya no son necesarios los
//datos de ejemplo, se borran esas importaciones.

// Creamos el contexto para los estudiantes
export const StudentContext = React.createContext<StudentContextType>(
    {} as StudentContextType
);

// Proveedor del contexto de estudiantes:
//Mediante Hooks, gestionamos la lista de estudiantes, el estado del spinner de carga, los mensajes a mostrar en las alertas y
// la configuración del modal de confirmación (IMPORTANTE).
export const StudentProvider = ({ children }: { children: React.ReactNode }) => {
    //Ya no es necesario importar los datos de ejemplo, ahora se gestionan desde el LocalStorage. Antes, en vez de el array vacio,
    //  se ponia initialStudents, que era el array importado de datos de ejemplo. Dado que desde el inicio se guardaban directamente
    //en el LocalStorage, lo he quitado porque era un engorro. Si necesitas probarlo para que se vea el paginador, simplemente mete unos datos de ejemplo
    // y sustituyes el array vacio por la lista de datos.
    const [students, setStudents] = useLocalStorage<Student[]>("students", []);
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState<'success' | 'danger'>('success');
    const [alertOpen, setAlertOpen] = React.useState(false);
    //Este estado gestiona la configuración del modal de confirmación, pasandole si está abierto, el título,
    // el mensaje y la función a ejecutar al confirmar
    const [modalConfig, setModalConfig] = React.useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: () => {}
    });
// Mediante esta función mostramos una alerta con el mensaje y tipo (éxito o error) que le pasemos con un temporizador de cierre automático
    const showAlert = (message: string, type: 'success' | 'danger') => {
        setMessage(message);
        setType(type);
        setAlertOpen(true);
        setTimeout(() => setAlertOpen(false), 3000);
    }

    //Funcion tipica para añadir un estudiante
    const addStudent = (student: Student) => {
        setLoading(true);
        setStudents(prev => [...prev, { ...student, id: student.id || Date.now() }]);
        showAlert("Alumno añadido correctamente", "success");
        setTimeout(() => setLoading(false), 3000);

    };

    //Funcion tipica para actualizar un estudiante
    const updateStudent = (student: Student) => {
        setLoading(true);
        setStudents(prev => prev.map(s => s.id === student.id ? student : s));
        showAlert("Alumno actualizado", "success");
        setTimeout(() => setLoading(false), 3000);
    };

    //Funcion para borrar un estudiante
    const deleteStudent = (id: number) => {
        setLoading(true);
        setStudents(prev => prev.filter(s => s.id !== id));
        showAlert("Alumno eliminado", "success");
        setTimeout(() => setLoading(false), 3000);
    };

    //Aqui esta el meollo del asunto: Esta función configura y abre el modal de confirmación, con los tres parametros que necesita:
    // el título, el mensaje y la función a ejecutar si se confirma la acción.
    const askConfirmationModal = (
        title: string,
        message: string,
        onConfirm: () => void
    ) => {
        //Mediante su Hook, le damos forma al modal de confirmacion cada vez que se llame a este metodo,
        //  diciendole que se abra, que le ponga un titulo, un mensaje y una función onConfirm que primero ejecute la función
        // que le pasamos por parámetro(addStudent, deleteStudent...etc) y luego cierre el modal.
        setModalConfig({
            isOpen: true,
            title,
            message,
            onConfirm: () => {
                onConfirm();
                setModalConfig(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    //Por ultimo retornamos el proveedor del contexto, pasando todos los valores y funciones que queramos para
    //pasarselos a los componentes hijos que lo vayan a utilizar. Tambien (Y MUY IMPORTANTE) incluimos el componente ModalConfirm
    // dentro del proveedor, pasandole la configuración que hemos creado en el estado modalConfig, para que esté disponible
    // en toda la parte de Student de la aplicacion y se muestre cuando se llame a la función askConfirmationModal, pero esta vez
    // le añadimos en el onCancel tambien, el cierre de dicha modal. Pero OJO, el onCancel no esta definido en el tipo, ya que
    // es una función que solo se usa para cerrar el modal.

    //De esta manera, podremos disponer del modal de confirmacion siempre que lo necesitemos sin tener que
    //implementarla en ningun renderizado aparte. (Me ha gustado mucho este reto).
    return (
        <StudentContext.Provider value={{
            students,
            addStudent,
            updateStudent,
            deleteStudent,
            askConfirmationModal,
            loading,
            message,
            type,
            alertOpen
        }}>
            {children}
            <ModalConfirm
                isOpen={modalConfig.isOpen}
                title={modalConfig.title}
                message={modalConfig.message}
                onConfirm={modalConfig.onConfirm}
                onCancel={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
            /> 
        </StudentContext.Provider>
    );
};
