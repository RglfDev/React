import { useContext } from "react"
import { ParticipantContext } from "../../context/ParticipantContext"
import { EventContext } from "../../context/EventContext";
import { Link, useNavigate } from "react-router-dom";
import { useFilteredParticipants } from "../../hooks/useFilteredParticipants";


const ParticipantList = () => {
    const {participants, deleteParticipant} = useContext(ParticipantContext)
    const { events } = useContext(EventContext);
    const navigate = useNavigate()

    const {filteredParticipants, filter, setFilter} = useFilteredParticipants()

    const getEventName = (id:number) => {
        const event = events.find(e=> e.id === id)
        return event ? event.title : "No event yet"
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Participant List</h2>
                <button 
                    className="btn btn-primary"
                    onClick={() => navigate("/participants/new")}
                >
                    Add New Participant
                </button>
            </div>

            <div className="mb-4">
                <input 
                    type="text"
                    className="form-control"
                    placeholder="Search by name or event..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)} 
                />
            </div>

            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Assigned Event</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants && participants.length > 0 ? (
                            filteredParticipants.map(p => (
                                <tr key={p.id}>
                                    <td><strong>{p.name}</strong></td>
                                    <td>{p.email}</td>
                                    <td>
                                        <span className="badge bg-info text-dark">
                                            {getEventName(p.eventId)}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center">
                                            <Link 
                                                to={`/participants/${p.id}/edit`}
                                                className="btn btn-sm btn-warning me-2"
                                            >
                                                Edit
                                            </Link>
                                            <button 
                                                className="btn btn-danger btn-sm"
                                                onClick={() => {
                                                    const confirm = window.confirm(`Delete ${p.name}?`);
                                                    if(confirm) deleteParticipant(p.id!);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">No participants registered yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ParticipantList