import { useContext, useState } from "react";
import { StudentContext } from "../../context/StudentContext";
import { useNavigate, useParams } from "react-router";
import { CourseContext } from "../../context/CourseContext";
import type { ErrorsStudent } from "../../types/Student";

//Formulario para añadir o editar estudiantes. Usa el contexto de estudiantes para las operaciones CRUD
//y el contexto de cursos para mostrar la lista de cursos en el select. También maneja la validación del formulario
//y muestra errores si los campos no son válidos.
const StudentForm = () => {
    const { students, addStudent, updateStudent, askConfirmationModal } = useContext(StudentContext);
    const {courses} = useContext(CourseContext);
    const { id } = useParams();
// Variable para navegar entre rutas
  const navigate = useNavigate();
  //Buscamos el estudiante a editar si hay un id en los parámetros de la ruta
    const studentToEdit = students.find(s => s.id === Number(id));

  //Estados para los campos del formulario y los errores de validación
    const [name, setName] = useState(studentToEdit ? studentToEdit.name : "");
    const [email, setEmail] = useState(studentToEdit ? studentToEdit.email : "");
    const [courseId, setCourseId] = useState(studentToEdit ? studentToEdit.courseId : 0);
    const [errors, setErrors] = useState<ErrorsStudent>({});
    const [isValid, setIsValid] = useState(false);

  //Función para validar el formulario, que recibe los campos a validar
    const ValidateForm = (name: string, email: string, courseId: number) => {
     const newErrors: ErrorsStudent = {};
      //Establecemos las reglas de validación para cada campo
     if (!name) {
         newErrors.name = "El nombre es obligatorio";
        }
        if (name.length < 3) {
            newErrors.name = "El nombre debe contener al menos 3 caracteres";
        }
        if (!email) {
            newErrors.email = "El correo es obligatorio";
        }
        if (!courseId) {
            newErrors.courseId = "Debes seleccionar un curso";
        }

      //Actualizamos el estado de errores y validez del formulario
        setErrors(newErrors);
        setIsValid(true);
        return Object.keys(newErrors).length === 0;

    }

    //Función para abrir el modal de confirmación al enviar el formulario
    const openModalconfirm = (e: React.FormEvent) => {
      e.preventDefault();
      //Si el formulario no es válido, no hacemos nada
        if (!ValidateForm(name, email, Number(courseId))) return;
      //Reglas de validación "globales"
        if (name.trim().toLowerCase().includes("rauldominguez")) {
            setErrors({...errors, name: "Raul Dominguez ha sido expulsado del centro para siempre jamas"});
            setIsValid(false);
            return;
      }
      
      if (!email.trim().toLowerCase().endsWith("@school.com")) { 
        setErrors({...errors, email: "El correo debe pertenecer al dominio @school.com"});
        setIsValid(false);
        return;
      }
      //Abrimos el modal de confirmación con los datos del estudiante a añadir o editar, los vuales metemos en un objeto data
      //y pasamos a la función del contexto para que si tiene id edite, y si no lo tiene añada uno nuevo.Por ultimo, redirigimos a la lista de estudiantes.
        askConfirmationModal(
            studentToEdit ? "Actualizar estudiante" : "Agregar estudiante",
            `¿Estás seguro de que deseas ${studentToEdit ? "actualizar" : "agregar"} este estudiante?`,
            () => {
                const data = {
                    name,
                    email,
                    courseId: Number(courseId)
                }

                if (id) {
                    updateStudent({ ...data, id: Number(id) });
                } else {
                    addStudent(data);
                }
                navigate("/students");
            }
        );
  }
  
  //El renderizado del formulario, que se muestra como un modal tambien.
     return (  
    <>  
      <div className="modal fade show d-block" role="dialog" tabIndex={-1}>  
        <div  
          className="modal-dialog modal-lg modal-dialog-centered"  
          role="document"  
        >  
          <div className="modal-content">  
            <div className="modal-header">  
                 <h5 className="modal-title">
                {/* Título dinámico según si es edición o creación */}   
                {id ? "Edit Student" : "Add Student"}  
                 </h5> 
              {/* Botón para cerrar el modal, que redirige a la lista de estudiantes */}   
              <button  
                type="button"  
                className="btn-close"  
                aria-label="Close"  
                onClick={() => navigate("/students")}  
              ></button>  
               </div>
               {/* El formulario en sí, con los campos controlados y validación en tiempo real */}
            {/*En todos los campos usamos la función ValidateForm para validar en cada cambio y actualizar los errores e isValid */}   
            <form onSubmit={openModalconfirm} noValidate>  
              <div className="modal-body">  
                   <div className="mb-3">  
                     {/* Campo de nombre */}
                  <label className="form-label">Name</label>  
                  <input  
                    type="text"  
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}  
                    placeholder="Ej: John Doe"  
                    value={name}  
                        onChange={(e) => { 
                        setName(e.target.value);
                      ValidateForm(  
                        e.target.value,  
                        email,  
                        Number(courseId),  
                      );  
                    }}  
                  />  
                  <div className="invalid-feedback">{errors.name}</div>  
                </div>  
                   <div className="mb-3"> 
                  {/* Campo de email */}   
                  <label className="form-label">Email</label>  
                  <input  
                    type="text"  
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}  
                    placeholder="Ej: john.doe@school.com"  
                    value={email}  
                    onChange={(e) => {    
                      setEmail(e.target.value);  
                      ValidateForm(  
                        name,  
                        e.target.value, 
                        Number(courseId),  
                      );  
                    }}  
                  />  
                  <div className="invalid-feedback">{errors.email}</div>  
                </div>  
                <div className="row">  
                     <div className="col-md-6 mb-3">  
                       {/* Select de curso */}
                    <label className="form-label">Course</label>  
                    <select  
                      className={`form-select ${errors.courseId ? "is-invalid" : ""}`}  
                      value={courseId}  
                      onChange={(e) => {  
                        setCourseId(Number(e.target.value));  
                        ValidateForm(  
                          name,  
                          email,  
                          Number(e.target.value),  
                        );  
                      }}  
                    >  
                      <option value={0}>Select Course</option>  
                      {courses.map((course) => (  
                        <option key={course.id} value={course.id}>  
                          {course.title}  
                        </option>  
                      ))}  
                    </select>  
                     
                    <div className="invalid-feedback">{errors.courseId}</div>  
                                     </div>
                                 </div>
                </div>  
              {/* Botones de enviar y cancelar, los cuales permiten enviar el formulario o cancelar la operación */}
                 <div className="modal-footer d-flex gap-2">  
                   {/* El botón de enviar está deshabilitado si el formulario no es válido */}
                <button  
                  type="submit"  
                  className="btn btn-primary"  
                  disabled={!isValid}  
                >  
                  {id ? "Modificar Estudiante" : "Guardar Estudiante"}  
                   </button>  
                   {/* Botón de cancelar que redirige a la lista de estudiantes de nuevo */}
                <button  
                  type="button"  
                  className="btn btn-outline-secondary"  
                  onClick={() => navigate("/students")}  
                >  
                  Cancelar  
                </button>  
              </div>  
            </form>  
          </div>  
        </div>  
      </div>  
      <div className="modal-backdrop fade show"></div>  
    </>  
  );  

                             
}

export default StudentForm;