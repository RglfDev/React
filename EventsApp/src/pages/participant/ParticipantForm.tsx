// import { useContext, useState } from "react";
// import { ParticipantContext } from "../../context/ParticipantContext";
// import { useNavigate, useParams } from "react-router-dom";
// import { EventContext } from "../../context/EventContext";
// import { validateForm } from "../../validation/validateForm";
// import { ValidationError } from "../../validation/ValidationError";

// const participantRules = {
//     name: { 
//         required: true, 
//         minLength: 2, 
//         maxLength: 50, 
//         pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/ 
//     },
//     email: { 
//         required: true, 
//         isEmail: true, 
//         maxLength: 100 
//     },
//     eventId: { 
//         required: true,
//         min: 1 // Si el valor es 0, dará error porque pedimos mínimo 1
//     }
// };

// const ParticipantForm = () => {
//     const { participants, addParticipant, updateParticipant } = useContext(ParticipantContext);
//     const { events } = useContext(EventContext);
//     const { id } = useParams();
//     const navigate = useNavigate();

//     // Buscar si estamos en modo edición
//     const participantEdit = participants.find(p => p.id === Number(id));

//     // Estados del formulario
//     const [name, setName] = useState(participantEdit ? participantEdit.name : "");
//     const [email, setEmail] = useState(participantEdit ? participantEdit.email : "");
//     const [eventId, setEventId] = useState(participantEdit ? participantEdit.eventId : 0);
//     const [errors, setErrors] = useState<string[]>([]);

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();

//         // Ejecutar validación genérica
//         const validationErrors = validateForm(
//             { name, email, eventId }, 
//             participantRules
//         );

//         if (validationErrors.length > 0) {
//             setErrors(validationErrors);
//             return; // Detener si hay errores
//         }

//         setErrors([]); // Limpiar errores si todo es válido
        
//         const participantData = { name, email, eventId };

//         if (id) {
//             updateParticipant({ id: Number(id), ...participantData });
//         } else {
//             addParticipant(participantData);
//         }

//         navigate("/participants");
//     };

//     return (
//         <div className="container mt-4" style={{ maxWidth: '500px' }}>
//             <div className="card shadow p-4">
//                 <h2 className="text-center mb-4">
//                     {id ? "Edit Participant" : "New Participant"}
//                 </h2>
                
//                 <form onSubmit={handleSubmit}>
//                     {/* CAMPO: NOMBRE */}
//                     <div className="mb-3">
//                         <label className="form-label font-weight-bold">Name</label>
//                         <input 
//                             type="text"
//                             className={`form-control ${errors.some(e => e.toLowerCase().includes("name")) ? 'is-invalid' : ''}`}
//                             placeholder="Enter full name" 
//                             value={name} 
//                             onChange={(e) => setName(e.target.value)} 
//                         />
//                         <ValidationError errors={errors} field="name" />
//                     </div>

//                     {/* CAMPO: EMAIL */}
//                     <div className="mb-3">
//                         <label className="form-label font-weight-bold">Email</label>
//                         <input 
//                             type="email"
//                             className={`form-control ${errors.some(e => e.toLowerCase().includes("email")) ? 'is-invalid' : ''}`}
//                             placeholder="example@mail.com"  
//                             value={email} 
//                             onChange={(e) => setEmail(e.target.value)} 
//                         />
//                         <ValidationError errors={errors} field="email" />
//                     </div>

//                     {/* CAMPO: SELECCIÓN DE EVENTO */}
//                     <div className="mb-3">
//                         <label className="form-label font-weight-bold">Select an Event</label>
//                         <select 
//                             className={`form-select ${errors.some(e => e.toLowerCase().includes("event")) ? 'is-invalid' : ''}`}
//                             value={eventId} 
//                             onChange={(e) => setEventId(Number(e.target.value))}
//                         >
//                             <option value={0} disabled>--* CHOOSE AN EVENT *--</option>
//                             {events.map(ev => (
//                                 <option key={ev.id} value={ev.id}>
//                                     {ev.title}
//                                 </option>
//                             ))}
//                         </select>
//                         <ValidationError errors={errors} field="event" />
//                     </div>

//                     {/* ACCIONES */}
//                     <div className="d-flex gap-2 mt-4">
//                         <button type="submit" className="btn btn-success w-100 shadow-sm">
//                             {id ? "Update Changes" : "Save Participant"}
//                         </button>
//                         <button 
//                             type="button" 
//                             className="btn btn-outline-secondary w-100" 
//                             onClick={() => navigate("/participants")}
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ParticipantForm;

import { useContext, useState } from "react"
import { ParticipantContext } from "../../context/ParticipantContext"
import { useNavigate, useParams } from "react-router-dom"
import { EventContext } from "../../context/EventContext";
import { validateParticipantForm } from "../../validation/validateParticipantForm";


const ParticipantForm = () => {
    const {participants, addParticipant, updateParticipant} = useContext(ParticipantContext)
    const {events} = useContext(EventContext)

    const {id} = useParams()
    const navigate = useNavigate()

    const participantEdit = participants.find(p=>p.id === Number(id));

    const [name,setName] = useState(participantEdit? participantEdit.name : "")
    const [email,setEmail] = useState(participantEdit? participantEdit.email : "")
    const [eventId,setEventId] = useState(participantEdit? participantEdit.eventId : 0)
    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateParticipantForm(name, email, eventId);

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors([]);
        
        if (id) {
            updateParticipant({ id: Number(id), name, email, eventId });
        } else {
            addParticipant({ name, email, eventId });
        }

        navigate("/participants");
    };


return (
    <div className="container mt-4" style={{ maxWidth: '500px' }}>
        
        <div className="card shadow p-4">
            <h2 className="text-center mb-4">{id ? "Edit Participant" : "New Participant"}</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Full Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email"
                        className="form-control"
                        placeholder="example@mail.com"  
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Select an Event</label>
                    <select 
                        className="form-select"
                        value={eventId} 
                        onChange={(e) => setEventId(Number(e.target.value))}
                    >
                        <option value={0} disabled>--* CHOOSE AN EVENT *--</option>
                        {events.map(ev => (
                            <option key={ev.id} value={ev.id}>
                                {ev.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="d-flex gap-2 mt-4">
                    <button type="submit" className="btn btn-success w-100">
                        Save
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-secondary w-100" 
                        onClick={() => navigate("/participants")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div> 
        {errors.length > 0 && (
            <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
                <ul className="list-unstyled mb-0 text-center">
                    {errors.map((error, index) => (
                        <li key={index} className="small">
                            {error}
                        </li>
                    ))}
                </ul>
                <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setErrors([])}
                ></button>
            </div>
        )}

    </div>
);
};

export default ParticipantForm;
