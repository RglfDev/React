import React, { useState } from "react";
import type { EventContextType, Events } from "../types/Event";
import { initialEvents } from "../data/Event";


export const EventContext = React.createContext<EventContextType>(
    {} as EventContextType

)

export const EventProvider = ({children} : {children: React.ReactNode}) => {
    const [events, setEvents] = useState<Events[]>(initialEvents);

    const addEvent = (event:Events) => {
        setEvents(prev => [...prev, {...event, id: Date.now()}])
    }

    const updateEvent = (event:Events) => {
        setEvents(prev => prev.map(n => n.id === event.id ? event : n))
    }

    const deleteEvent = (id:number) => {
        setEvents(prev => prev.filter ( e => e.id !== id))
    }


    return (
        <EventContext.Provider value={{events, addEvent, updateEvent, deleteEvent}}>
        {children}
        </EventContext.Provider>
    )
}