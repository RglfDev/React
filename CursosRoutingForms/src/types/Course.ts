import type { Student } from "./Student";

//Tipo para los cursos
export type Course = {
    id?: number;
    title: string;
    instructor: string;
    capacity: number;
}

//Tipo para el contexto de cursos, el cual necesita a los estudiantes para poder contarlos y mostrarlos por curso
//tambien posee los atributos necesarios para mostrar alertas y modales de confirmación.
//El metodo AskConfirmationModal recibe un callback onConfirm que se ejecuta si el usuario confirma la acción,que es el que
//realmente realiza la acción de borrado, editado o creacion.
export type CourseContextType = {
    courses: Course[];
    addCourse: (course: Course) => void;
    updateCourse: (course: Course) => void;
    deleteCourse: (id: number, students: Student[]) => void;
    loading: boolean,
    message: string,
    type: 'success' | 'danger',
    alertOpen:boolean,
    askConfirmationModal: (title: string, message: string, onConfirm: () => void) => void;
    countStudents: (courseId: number, students: Student[]) => number;
}

//Tipo para los errores de validación en el formulario de cursos
export interface ErrorsCourse {
    title?: string;
    instructor?: string;
    capacity?: string;
}