export interface Incident {
    _id: string;
    titulo: string;
    descripcion: string;
    categoria: "hardware" | "software" | "red" | "otro";
    prioridad: "baja" | "media" | "alta";
    estado: "abierto" | "en_progreso" | "resuelto";
    fechaCreacion: string;
    fechaCierre: string | null;
}
