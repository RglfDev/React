import ConfirmModal from "./components/ConfirmModal";
import IncidentForm from "./components/IncidentForm";
import IncidentTable from "./components/IncidentTable";
import Spinner from "./components/Spinner";
import { IncidentProvider, useIncident } from "./context/IncidentContext";

export default function App() {
  return (
    <div>
      <h1 className="text-center my-4">Sistema de gestión de incidentes</h1>
      <IncidentProvider>
        <Main />
      </IncidentProvider>
    </div>
  );
}

function Main() {
  const {
    incidents,
    loading,
    errors,
    success,
    changeEstado,
    deleteIncident,
    setDeleteId,
    deleteId,
  } = useIncident();
  return (
    <div className="container mt-4">
      {deleteId && (
        <ConfirmModal
          onConfirm={() => deleteIncident(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
      <div className="card mb-4">
        <div className="card-body">
          <IncidentForm />
          {errors && <div className="alert alert-danger mt-3">{errors}</div>}
          {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
      </div>
      {loading && (
        <div className="d-flex justify-content-center my-3">
          <Spinner />
        </div>
      )}
      <div className="card">
        <div className="card-body">
          <h4 className="mb-3">Lista de incidentes</h4>
          <IncidentTable
            incidents={incidents}
            onChangeEstado={changeEstado}
            onDelete={deleteIncident}
            setDeleteId={setDeleteId}
          />
        </div>
      </div>
    </div>
  );
}
