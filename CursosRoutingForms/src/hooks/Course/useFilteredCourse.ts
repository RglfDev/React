import React from "react";
import { CourseContext } from "../../context/CourseContext";


// Hook personalizado para filtrar cursos según el nombre del instructor. Funciona igual que el de estudiantes.
//La explicacion esta en useFilteredStudents.ts
export const useFilteredCourses = (initialFilter: string) => {
    const { courses } = React.useContext(CourseContext);
    const [filter, setFilter] = React.useState(initialFilter);

    const filteredCourses = React.useMemo(() => {
        const searchTerm = filter.toLowerCase().trim();

        // Si no hay texto, devolvemos todos los cursos
        if (!searchTerm) return courses;

        const result = courses.filter(course => {
            // Accedemos directamente a la propiedad instructor
            const instructorName = course.instructor.toLowerCase();
            return instructorName.includes(searchTerm);
        });

        return result;
    }, [filter, courses]);

    return { filter, setFilter, filteredCourses };
};