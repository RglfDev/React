import { useContext, useMemo, useState } from "react";
import { EventContext } from "../context/EventContext";



export const useFilteredEvents = (initialFilter: string = "") => {
    const { events } = useContext(EventContext);
    const [filter, setFilter] = useState(initialFilter);

    const filteredEvents = useMemo(() => {
        if (!filter.trim()) return events;

        const lowerCaseFilter = filter.toLowerCase();

        return events.filter(ev => {
            const eventTitle = ev.title.toLowerCase();
            const eventLocation = ev.location.toLowerCase();

            return (
                eventTitle.includes(lowerCaseFilter) || 
                eventLocation.includes(lowerCaseFilter)
            );
        });
    }, [events, filter]);

    return {
        filter,
        setFilter,
        filteredEvents
    };
}