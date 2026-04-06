import React from "react";
import type { Course, CourseContextType } from "../types/Course";
import ModalConfirm from "../components/modalConfirm";
import type { Student } from "../types/Student";
import { useLocalStorage } from "../hooks/useLocalStorage";


//Este contexto maneja los cursos y sus operaciones. Se explica mas en profundidad en StudentContext.tsx el general de los contextos,
//por lo que aqui solo voy a explicar las diferencias que se puedan encontrar con el otro.
export const CourseContext = React.createContext<CourseContextType>(
    {} as CourseContextType
);

export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
     //Ya no es necesario importar los datos de ejemplo, ahora se gestionan desde el LocalStorage. Antes, en vez de el array vacio,
    //  se ponia initialCourse, que era el array importado de datos de ejemplo. Dado que desde el inicio se guardaban directamente
    //en el LocalStorage, lo he quitado porque era un engorro. Si necesitas probarlo para que se vea el paginador, simplemente mete unos datos de ejemplo
    // y sustituyes el array vacio por la lista de datos.
    const [courses, setCourses] = useLocalStorage<Course[]>("courses", []);
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState<'success' | 'danger'>('success');
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [modalConfig, setModalConfig] = React.useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: () => { }
    });

    //Función para contar cuántos estudiantes están inscritos en un curso dado, la cual recibe el id del curso y la lista de estudiantes
    //y devuelve el número de estudiantes inscritos en ese curso.
    const getEnrolledCount = (courseId: number, students: Student[]) => {
    if (!students) return 0;
    return students.filter(s => s.courseId === courseId).length;
};

    //Función para mostrar alertas dinámicas
    const showAlert = (message: string, type: 'success' | 'danger') => {
        setMessage(message);
        setType(type);
        setAlertOpen(true);
        setTimeout(() => setAlertOpen(false), 3000);
    };

    //Operaciones CRUD para los cursos
    const addCourse = (course: Course) => {
        setLoading(true);
        setCourses(prev => [...prev, { ...course, id: course.id || Date.now() }]);
        showAlert("Curso añadido correctamente", "success");
        setTimeout(() => setLoading(false), 3000);
    };

    const updateCourse = (course: Course) => {
        setLoading(true);
        setCourses(prev => prev.map(c => c.id === course.id ? course : c));
        showAlert("Curso actualizado", "success");
        setTimeout(() => setLoading(false), 3000);
    };

    //Aqui hay un cambio reseñable, y es que se maneja la opcion de que si el curso tiene estudiantes inscritos, no se pueda borrar,
    //avisando al usuario mediante un alert.
    const deleteCourse = (id: number, students: Student[]) => {
        const hasStudents = students.some(s => s.courseId === id);
        
        if (hasStudents) {
            showAlert("No se puede borrar: El curso tiene alumnos inscritos", "danger");
            return;
        }

        setLoading(true);
        setCourses(prev => prev.filter(c => c.id !== id));
        showAlert("Curso eliminado", "success");
        setTimeout(() => setLoading(false), 3000);
    };


//El funcionamiento de la modal es exactamente igual al de StudentContext.tsx. Mejor explicado ahi.
    const askConfirmationModal = (
        title: string,
        message: string,
        onConfirm: () => void
    ) => {
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

    //Retornamos el proveedor del contexto con todos los valores y funciones necesarias, incluyendo el ModalConfirm.
    return (
        <CourseContext.Provider value={{
            courses,
            addCourse,
            updateCourse,
            deleteCourse,
            askConfirmationModal,
            countStudents: getEnrolledCount,
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
        </CourseContext.Provider>
    );
    
};