export type Events = {
    id?:number;
    title: string;
    date:string;
    location:string;
    capacity:number;
}

export type EventContextType = {
    events: Events[]
    addEvent : (e:Events) => void;
    updateEvent: (e:Events) => void;
    deleteEvent: (id:number) => void;
}

