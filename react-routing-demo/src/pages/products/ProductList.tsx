import { use } from "react";
import { ProductContext } from "../../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const { products, deleteProduct } = use(ProductContext);
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white rounded shadow-sm border-start border-4 border-primary">
            <div>
              <h3 className="fw-bold mb-0 text-dark">Product Management</h3>
              <small
                className="text-muted text-uppercase fw-semibold"
                style={{ fontSize: "0.7rem" }}
              >
                Product Control Panel
              </small>
            </div>
            <button
              className="btn btn-primary rounded-pill px-4 shadow-sm fw-bold"
              onClick={() => navigate("/products/new")}
            >
              <span className="me-1">+</span> New Product
            </button>
          </div>

          <div className="card shadow border-0 overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th
                      className="ps-4 py-3 text-secondary text-uppercase"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Product Info
                    </th>
                    <th
                      className="text-center text-secondary text-uppercase"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Status
                    </th>
                    <th
                      className="text-end pe-4 text-secondary text-uppercase"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="border-top-0">
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td className="ps-4 py-3">
                        <div className="d-flex align-items-center">
                          <div
                            className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                            style={{ width: "40px", height: "40px" }}
                          >
                            {p.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="fw-bold text-dark">{p.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2">
                           Active
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <Link
                          to={`/products/${p.id}/edit`}
                          className="btn btn-sm btn-light border text-warning me-2"
                          title="Edit product"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-light border text-danger"
                          onClick={() => {
                            const ok = window.confirm(
                              "Are you sure you want to delete this record?",
                            );
                            if (ok) deleteProduct(p.id!);
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

            {products.length === 0 && (
              <div className="p-5 text-center bg-white">
                <h5 className="text-muted">Your inventory is empty</h5>
                <p className="small text-secondary">
                  Try adding some products to see them listed here.
                </p>
              </div>
            )}
          </div>

          <div className="mt-3 text-end">
            <p className="text-muted small">Total records: {products.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
