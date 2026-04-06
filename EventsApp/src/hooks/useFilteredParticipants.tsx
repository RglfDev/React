import { useContext, useMemo, useState } from "react"
import { ParticipantContext } from "../context/ParticipantContext"
import { EventContext } from "../context/EventContext"
import type { Participant } from "../types/Participants"


export const useFilteredParticipants = (initialFilter:string = "") =>{
    const {participants} = useContext(ParticipantContext)
    const { events } = useContext(EventContext)
    const [filter, setFilter] = useState(initialFilter)

    const filteredParticipants = useMemo(() => {
        if (!filter.trim()) return participants;

        const lowerCaseFilter = filter.toLowerCase();

        return participants.filter(p => {
            const event = events.find(e => e.id === p.eventId);
            const eventName = event ? event.title.toLowerCase() : "";

            return (
                p.name.toLowerCase().includes(lowerCaseFilter) || 
                eventName.includes(lowerCaseFilter)
            );
        });
    }, [participants, events, filter]);

    return {
        filter,
        setFilter,
        filteredParticipants
    };
}