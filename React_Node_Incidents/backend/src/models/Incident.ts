import { Schema, model } from "mongoose";

const IncidentSchema = new Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    categoria: { type: String, required: true },
    prioridad: { type: String, required: true },
    estado: { type: String, default: "abierto" },
    fechaCreacion: { type: Date, default: Date.now },
    fechaCierre: { type: Date }
});

export default model("Incident", IncidentSchema);
