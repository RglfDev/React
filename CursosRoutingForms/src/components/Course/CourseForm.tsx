import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CourseContext } from "../../context/CourseContext";
import type { ErrorsCourse } from "../../types/Course";


//Este formulario funciona exactamente igual que el de estudaiantes, con validaciones en tiempo real y
//  una modal de confirmación antes de guardar los cambios. No se explica ya que no hay cambios reseñables.
//Lo unico a destacar es que se ha añadido una validación extra que impide crear cursos con "matemáticas" en el título.
const CourseForm = () => {
    const { courses, addCourse, updateCourse, askConfirmationModal } = useContext(CourseContext);
    const { id } = useParams();

    const navigate = useNavigate();
    const courseToEdit = courses.find(s => s.id === Number(id));

    const [title, setTitle] = useState(courseToEdit ? courseToEdit.title : "");
    const [instructor, setInstructor] = useState(courseToEdit ? courseToEdit.instructor : "");
    const [capacity, setCapacity] = useState(courseToEdit ? courseToEdit.capacity : 0);
    const [errors, setErrors] = useState<ErrorsCourse>({});
    const [isValid, setIsValid] = useState(false);

    const ValidateForm = (title: string, instructor: string, capacity: number) => {
     const newErrors: ErrorsCourse = {};
     if (!title) {
         newErrors.title = "El nombre es obligatorio";
        }
        if (title.length < 3) {
            newErrors.title = "El nombre debe contener al menos 3 caracteres";
        }
        if (!instructor) {
            newErrors.instructor = "El instructor es obligatorio";
      } 
      
        if (!capacity) {
            newErrors.capacity = "La capacidad es obligatoria";
        } else if (capacity <= 15){
            newErrors.capacity = "La capacidad debe ser mayor a 15 estudiantes";
        }

        setErrors(newErrors);
        setIsValid(Object.keys(newErrors).length === 0);
        return Object.keys(newErrors).length === 0;

    }


    const openModalconfirm = (e: React.FormEvent) => {
        e.preventDefault();
        if (!ValidateForm(title, instructor, Number(capacity))) return;

        if (title.trim().toLowerCase().includes("matematicas")) {
            setErrors({...errors, title: "Aqui no se imparten ese tipo de cursos"});
            setIsValid(false);
            return;
        }

        askConfirmationModal(
            courseToEdit ? "Actualizar curso" : "Agregar curso",
            `¿Estás seguro de que deseas ${courseToEdit ? "actualizar" : "agregar"} este curso?`,
            () => {
                const data = {
                    title,
                    instructor,
                    capacity: Number(capacity)
                }

                if (id) {
                    updateCourse({ ...data, id: Number(id) });
                } else {
                    addCourse(data);
                }
                navigate("/courses");
            }
        );
    }
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
                {id ? "Edit Course" : "Add Course"}  
              </h5>  
              <button  
                type="button"  
                className="btn-close"  
                aria-label="Close"  
                onClick={() => navigate("/courses")}  
              ></button>  
            </div>  
            <form onSubmit={openModalconfirm} noValidate>  
              <div className="modal-body">  
                <div className="mb-3">  
                  <label className="form-label">Titulo del curso</label>  
                  <input  
                    type="text"  
                    className={`form-control ${errors.title ? "is-invalid" : ""}`}  
                    placeholder="Ej: Matemáticas Avanzadas"  
                    value={title}  
                        onChange={(e) => { 
                        setTitle(e.target.value);
                      ValidateForm(  
                        e.target.value,  
                        instructor,  
                        Number(capacity),  
                      );  
                    }}  
                  />  
                  <div className="invalid-feedback">{errors.title}</div>  
                </div>  
                <div className="mb-3">  
                  <label className="form-label">Instructor</label>  
                  <input  
                    type="text"  
                    className={`form-control ${errors.instructor ? "is-invalid" : ""}`}  
                    placeholder="Ej: Juan Pérez"  
                    value={instructor}  
                    onChange={(e) => {    
                      setInstructor(e.target.value);  
                      ValidateForm(  
                        title,  
                        e.target.value, 
                        Number(capacity),  
                      );  
                    }}  
                  />  
                  <div className="invalid-feedback">{errors.instructor}</div>  
                </div>  
                <div className="row">  
                  <div className="col-md-6 mb-3">  
                    <label className="form-label">Capacidad</label>  
                        <input
                        type="number"
                        className={`form-control ${errors.capacity ? "is-invalid" : ""}`}
                        placeholder="Ej: 30"
                        value={capacity}
                        onChange={(e) => {
                        setCapacity(Number(e.target.value));
                        ValidateForm(
                        title,
                        instructor,
                        Number(e.target.value),
                        );
                    }}
                    />
                     
                    <div className="invalid-feedback">{errors.capacity}</div>  
                    </div>
                </div>
                </div>  
              
        <div className="modal-footer d-flex gap-2">  
                <button  
                  type="submit"  
                  className="btn btn-primary"  
                  disabled={!isValid}  
                >  
                  {id ? "Actualizar Curso" : "Guardar Curso"}  
                </button>  
                <button  
                  type="button"  
                  className="btn btn-outline-secondary"  
                  onClick={() => navigate("/courses")}  
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

export default CourseForm;