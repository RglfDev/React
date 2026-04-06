import type { Participant } from "../types/Participants";

export const initialParticipants: Participant[] = [
  {
    id: 101,
    name: "Alex Marín",
    email: "alex@example.com",
    eventId: 1, // Pertenece a Conferencia Tech
  },
  {
    id: 102,
    name: "Beatriz Soler",
    email: "beatriz@example.com",
    eventId: 1, // Pertenece a Conferencia Tech
  },
  {
    id: 103,
    name: "Carlos Peña",
    email: "carlos@example.com",
    eventId: 2, // Pertenece a Taller de React
  },
  {
    id: 104,
    name: "Diana Rivas",
    email: "diana@example.com",
    eventId: 3, // Pertenece a Hackathon
  }
];