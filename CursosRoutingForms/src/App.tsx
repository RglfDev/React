import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import StudentPage from "./pages/StudentsPage";
import StudentForm from "./components/Student/studentForm";
import CoursePage from "./pages/CoursePage";
import CourseForm from "./components/Course/CourseForm";

//Componente App que maneja las rutas de la aplicación y renderiza el NavBar en todas las páginas.
//Mediante los Route, dirigimos al usuario a diferentes páginas para gestionar estudiantes y cursos mediante rutas de navegacion.
function App() {
  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentPage />} />
          <Route path="/students/new" element={<StudentForm />} />
          {/* Ruta para editar un estudiante existente, pasando el ID del estudiante como parámetro */}
          <Route path="/students/edit/:id" element={<StudentForm />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/courses/new" element={<CourseForm />} />
          {/* Ruta para editar un curso existente, pasando el ID del curso como parámetro */}
          <Route path="/courses/edit/:id" element={<CourseForm />} />
        </Routes>
      </div>
    </>
  )
}

export default App;