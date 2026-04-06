import React, { useState } from "react";
import type { Participant, ParticipantContextType } from "../types/Participants";
import { initialParticipants } from "../data/Participant";



export const ParticipantContext = React.createContext<ParticipantContextType>(
    {} as ParticipantContextType
)

export const ParticipantProvider = ({children} : {children:React.ReactNode}) => {
    const [participants, setParticipant] = useState<Participant[]>(initialParticipants)

    const addParticipant = (participant : Participant) => {
        setParticipant(prev=>[...prev, {...participant, id:Date.now()}])
    }

    const updateParticipant = (participant:Participant) => {
        setParticipant(prev => prev.map(p=>p.id === participant.id ? participant : p))
    }

    const deleteParticipant = (id:number) => {
        setParticipant(prev => prev.filter(p=>p.id !== id));
    }

    return(
        <ParticipantContext.Provider value={{participants,addParticipant,updateParticipant,deleteParticipant}}>
            {children}
        </ParticipantContext.Provider>
    )
}