import { useState } from "react";
import { useIncident } from "../context/IncidentContext";

// interface Props {
//     onSubmit: (data: any) => void;
// }

export default function IncidentForm() {
    const { handleCreate } = useIncident();

    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        categoria: "hardware",
        prioridad: "media"
    });

    const [error, setError] = useState("");

    const onSubmit = () => {
        if (!form.titulo || form.descripcion.length < 10) {
            setError("Datos invalidos");
            return;
        }
        setError("");
        handleCreate(form);
        setForm({ titulo: "", descripcion: "", categoria: "hardware", prioridad: "media" });
    };

    return (
        <div>
            <h4 className="mb-3">Nuevo incidente</h4>

            <div className="mb-3">
                <input
                    className="form-control"
                    placeholder="Titulo"
                    value={form.titulo}
                    onChange={e => setForm({ ...form, titulo: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <textarea
                    className="form-control"
                    placeholder="Descripcion"
                    rows={3}
                    value={form.descripcion}
                    onChange={e => setForm({ ...form, descripcion: e.target.value })}
                />
            </div>

            <div className="row mb-3">
                <div className="col">
                    <select
                        className="form-select"
                        value={form.categoria}
                        onChange={e => setForm({ ...form, categoria: e.target.value })}
                    >
                        <option value="">Categoria</option>
                        <option value="hardware">Hardware</option>
                        <option value="software">Software</option>
                        <option value="red">Red</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>

                <div className="col">
                    <select
                        className="form-select"
                        value={form.prioridad}
                        onChange={e => setForm({ ...form, prioridad: e.target.value })}
                    >
                        <option value="">Prioridad</option>
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                    </select>
                </div>
            </div>

            <button className="btn btn-primary" onClick={onSubmit}>
                Crear incidente
            </button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
}
