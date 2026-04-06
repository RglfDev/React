import type { Incident } from "../types/tipos";
import IncidentRow from "./IncidentRow";

interface Props {
    incidents: Incident[];
    onChangeEstado: (id: string, estado: string) => void;
    onDelete: (id: string) => void;
    setDeleteId: (id: string | null) => void;
}

export default function IncidentTable({ incidents, onChangeEstado, onDelete, setDeleteId }: Props) {
    return (
        <table className="table table-bordered table-hover">
            <thead className="table-dark">
                <tr>
                    <th>Titulo</th>
                    <th>Categoria</th>
                    <th>Prioridad</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {incidents.length === 0 && (
                    <tr>
                        <td colSpan={5} className="text-center text-muted">
                            No hay incidentes registrados
                        </td>
                    </tr>
                )}

                {incidents.map(i => (
                    <IncidentRow
                        key={i._id}
                        incident={i}
                        onChangeEstado={onChangeEstado}
                        onDelete={onDelete}
                        setDeleteId={setDeleteId}
                    />
                ))}
            </tbody>
        </table>
    );
}
