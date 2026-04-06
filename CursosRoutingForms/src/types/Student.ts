//Tipo para los estudiantes
export type Student = {
    id?: number;
    name: string;
    email: string;
    courseId: number;
}

//Tipo para el contexto de estudiantes
export type StudentContextType = {
    students: Student[];
    addStudent: (student: Student) => void;
    updateStudent: (student: Student) => void;
    deleteStudent: (id: number) => void;
    loading: boolean;
    message: string;
    type: 'success' | 'danger';
    alertOpen: boolean;
    askConfirmationModal: (title: string, message: string, onConfirm: () => void) => void;
}

//Props para el componente StudentForm (el formulario de estudiantes)
export interface StudentSearchProps {
    filter: string;
    setFilter: (value: string) => void;
}

//Tipo para los errores de validación en el formulario de estudiantes
export interface ErrorsStudent {
    name?: string;
    email?: string;
    courseId?: string;
}
