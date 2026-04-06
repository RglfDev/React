import type { Incident } from "../types/tipos";

interface Props {
  incident: Incident;
  onChangeEstado: (id: string, estado: string) => void;
  onDelete: (id: string) => void;
  setDeleteId: (id: string | null) => void;
}

export default function IncidentRow({
  incident,
  onChangeEstado,
  setDeleteId,
}: Props) {
  return (
    <tr>
      <td>{incident.titulo}</td>
      <td>{incident.categoria}</td>
      <td>
        <span
          className={`badge \
            ${
              incident.prioridad === "alta"
                ? "bg-danger"
                : incident.prioridad === "media"
                  ? "bg-warning text-dark"
                  : "bg-success"
            }`}
        >
          {incident.prioridad}
        </span>
      </td>
      <td>
        <span
          className={`badge \
            ${
              incident.estado === "abierto"
                ? "bg-secondary"
                : incident.estado === "en_progreso"
                  ? "bg-info text-dark"
                  : "bg-success"
            }`}
        >
          {incident.estado}
        </span>
      </td>
      <td>
        {incident.estado === "abierto" && (
          <button
            className="btn btn-sm btn-info me-2"
            onClick={() => onChangeEstado(incident._id, "en_progreso")}
          >
            En progreso
          </button>
        )}

        {incident.estado === "en_progreso" && (
          <button
            className="btn btn-sm btn-success me-2"
            onClick={() => onChangeEstado(incident._id, "resuelto")}
          >
            Resolver
          </button>
        )}

        <button
          className="btn btn-sm btn-danger"
          onClick={() => setDeleteId(incident._id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}
