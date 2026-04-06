import { useContext, useState } from "react"
import { EventContext } from "../../context/EventContext"
import { useNavigate, useParams } from "react-router-dom"
import { validateEventForm } from "../../validation/validateEventForm"



const EventForm = () => {
    const {events, addEvent, updateEvent} = useContext(EventContext)
    const {id} = useParams()
    const navigate = useNavigate()

    const eventToEdit = events.find(ev => ev.id === Number(id))

    const [title, setTitle] = useState(eventToEdit ? eventToEdit.title : "")
    const [date, setDate] = useState(eventToEdit ? eventToEdit.date : "")
    const [location, setLocation] = useState(eventToEdit ? eventToEdit.location : "")
    const [capacity, setCapacity] = useState(eventToEdit ? eventToEdit.capacity : 0)
    const[errors, setErrors] = useState<string[]>([]);



    const handleSubmit = (event:React.FormEvent)=>{
        event.preventDefault();
       
        const validationErrors = validateEventForm(title, location, date, capacity);
       
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }
       
        setErrors([]);
        id ? updateEvent({id:Number(id), title, location, capacity, date}) :
            addEvent({title, location, capacity, date});
           
        navigate("/events");
    }

    return(
        <form onSubmit={handleSubmit}>
            {errors.length > 0 && (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Validation Errors</strong>
                                    <ul className="mb-0 mt-2">
                                        {errors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                    <button type="button" className="btn-close" onClick={() => setErrors([])}></button>
                                </div>
                            )}
            <h2>{id ? "Edit Event" : "New Event"}</h2>

            <input type="text"
            className="form-control mb-2"
            placeholder="Title"
            value={title}
            onChange={e=> setTitle(e.target.value)} required/>

            <input type="text"
            className="form-control mb-2"
            placeholder="Date"
            value={date}
            onChange={e=> setDate(e.target.value)} required/>

            <input type="text"
            className="form-control mb-2"
            placeholder="Location"
            value={location}
            onChange={e=> setLocation(e.target.value)} required/>

            <input type="number"
            className="form-control mb-2"
            placeholder="Capacity"
            value={capacity}
            onChange={e=> setCapacity(Number(e.target.value))} required/>

            <button type="submit" className="btn btn-success">Save</button>
            <button type="button" className="btn btn-secondary"
            onClick={()=> navigate("/events")}>Cancel</button>

        </form>
    )
}

export default EventForm


