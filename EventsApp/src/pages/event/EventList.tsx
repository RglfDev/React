import { useContext } from "react"
import { EventContext } from "../../context/EventContext"
import { Link, useNavigate } from "react-router-dom"
import { ParticipantContext } from "../../context/ParticipantContext"
import { useFilteredEvents } from "../../hooks/useFilteredEvents"

const EventList = () => {
    const {events, deleteEvent} = useContext(EventContext)
    const { participants } = useContext(ParticipantContext)
    const navigate = useNavigate()

    const {filteredEvents, filter,setFilter} = useFilteredEvents()

    const getParticipantCount = (eventId?: number) =>
        participants.filter(p => p.eventId === eventId).length

    return (
    <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Event List</h2>
            <button 
                className="btn btn-primary"
                onClick={() => navigate("/events/new")}
            >
                Add New Event
            </button>
        </div>

        <div className="mb-4">
                <input 
                    type="text"
                    className="form-control"
                    placeholder="Search by name or location..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)} 
                />
            </div>

        <div className="table-responsive">
            <table className="table table-hover table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Capacity</th>
                        <th>Assistants</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEvents.map(ev => (
                        <tr key={ev.id}>
                            <td><strong>{ev.title}</strong></td>
                            <td>{ev.location}</td>
                            <td>{new Date(ev.date).toLocaleDateString()}</td>
                            <td>{ev.capacity}</td>
                            <td>{getParticipantCount(ev.id)}</td>
                            <td>
                                <div className="d-flex justify-content-center">
                                    <Link 
                                        to={`/events/${ev.id}/edit`}
                                        className="btn btn-sm btn-warning me-2"
                                    >
                                        Edit
                                    </Link>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => {
                                            const confirm = window.confirm(`Are you sure you want to delete the ${ev.title} event?`)
                                            if(confirm) deleteEvent(ev.id!)
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {events.length === 0 && (
                <p className="text-center mt-3">No events found.</p>
            )}
        </div>
    </div>
);
    // return(
    //     <div>
    //         <h2> Event List </h2>
    //         <button className="btn btn-primary mb-2"
    //         onClick={() => navigate("/events/new")}>
    //              Add new Event
    //         </button>
    //         <ul className="list-group">
    //             {events.map(ev=>(
    //                 <li key={ev.id} className="list-group-item d-flex justify-content-between align-items-center">
    //                     {ev.title}
    //                     <div>
    //                         <Link to={`/events/${ev.id}/edit`}
    //                         className="btn btn-sm btn-warning me-2">
    //                             Edit
    //                         </Link>
    //                     </div>
    //                     <button className="btn btn-danger btn-sm"
    //                     onClick={() => {
    //                         const confirm = window.confirm(`Are you sure you want to delete the ${ev.title} event?`)
    //                         if(confirm) deleteEvent(ev.id!)
    //                     }}>
    //                         Delete
    //                     </button>
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // )

}

export default EventList