import { useContext } from "react";
import { SupplierContext } from "../../context/SupplierContext";
import { useNavigate } from "react-router-dom";

const SupplierList = () => {
  const { suppliers, deleteSupplier } = useContext(SupplierContext);
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white rounded shadow-sm border-start border-4 border-info">
            <div>
              <h3 className="fw-bold mb-0 text-dark">Supplier Directory</h3>
              <small className="text-muted text-uppercase fw-semibold">
                Global Partners & Logistics
              </small>
            </div>
            <button
              className="btn btn-info text-white rounded-pill px-4 shadow-sm fw-bold"
              onClick={() => navigate("/suppliers/new")}
            >
              + Add Supplier
            </button>
          </div>

          <div className="card shadow border-0 overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-4 py-3 text-secondary text-uppercase small">
                      Supplier Info
                    </th>
                    <th className="text-center text-secondary text-uppercase small">
                      Location
                    </th>
                    <th className="text-end pe-4 text-secondary text-uppercase small">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="border-top-0">
                  {suppliers.map((s) => (
                    <tr key={s.id}>
                      <td className="ps-4 py-3">
                        <div className="d-flex align-items-center">
                          <div
                            className="bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center me-3 font-weight-bold"
                            style={{ width: "40px", height: "40px" }}
                          >
                            {s.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="fw-bold text-dark">{s.name}</div>
                            <div className="text-muted small">
                              Items: {s.products.join(", ")}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-info-subtle text-info border border-info-subtle px-3 py-2">
                          {s.city}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <button
                          className="btn btn-sm btn-outline-warning me-2 px-3"
                          onClick={() => navigate(`/suppliers/${s.id}/edit`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger px-3"
                          onClick={() => {
                            const ok = window.confirm("Are you sure?");
                            if (ok) deleteSupplier(s.id!);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {suppliers.length === 0 && (
              <div className="p-5 text-center bg-white">
                <h5 className="text-muted">No suppliers registered</h5>
                <p className="small text-secondary">
                  Start by adding your first business partner.
                </p>
              </div>
            )}
          </div>

          <div className="mt-3 text-end">
            <p className="text-muted small">
              Active Partners: {suppliers.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierList;
