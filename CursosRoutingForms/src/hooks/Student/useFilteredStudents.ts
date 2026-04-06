import React from "react";
import { StudentContext } from "../../context/StudentContext";
import { CourseContext } from "../../context/CourseContext";


// Hook personalizado para filtrar estudiantes según el título del curso
export const useFilteredStudents = (initialFilter: string) => {
    //traemos los estudiantes y cursos del contexto de cada uno
    const { students } = React.useContext(StudentContext);
    const { courses } = React.useContext(CourseContext);
    
    //creamos un hook de estado para el filtro de busqueda, el cual iniciamos con el valor pasado por parámetro (lo que escriba el user)
    const [filter, setFilter] = React.useState(initialFilter);
//Usamos useMemo para memorizar el resultado del filtrado y evitar que si el usuario no escribe nada, no se relance otra vez el filtro.
    const filteredStudents = React.useMemo(() => {
        const result = students.filter(student => {
        const course = courses.find(c => c.id === student.courseId);
        const courseTitle = course?.title.toLowerCase() || "";
        const searchTerm = filter.toLowerCase();
        
        return courseTitle.includes(searchTerm);
        }); 
        return result;
        //Si alguno de estos valores cambia, se relanza el filtro de busqueda (si cambia el filtro, los estudiantes o los cursos)
    }, [filter, students, courses]);

    //retornamos el filtro, la función para actualizarlo y los estudiantes filtrados
    return { filter, setFilter, filteredStudents };
}