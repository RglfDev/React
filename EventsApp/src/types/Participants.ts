export type Participant = {
    id?:number;
    name:string;
    email:string;
    eventId:number;
}

export type ParticipantContextType = {
    participants : Participant[];
    addParticipant:(p:Participant) => void;
    updateParticipant:(p:Participant) => void;
    deleteParticipant:(id:number) => void;
}

