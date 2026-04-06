import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SupplierContext } from "../../context/SupplierContext";

const SuppliersForm = () => {
  const { suppliers, addSupplier, updateSupplier } =
    useContext(SupplierContext);

  const navigate = useNavigate();
  const { id } = useParams();

  const supplierToEdit = suppliers.find((s) => s.id === Number(id));

  const [name, setName] = useState(supplierToEdit ? supplierToEdit.name : "");
  const [city, setCity] = useState(supplierToEdit ? supplierToEdit.city : "");
  const [products, setProducts] = useState(
    supplierToEdit ? supplierToEdit.products.join(", ") : "",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    id
      ? updateSupplier({
          id: Number(id),
          name,
          city,
          products: products.split(",").map((p) => p.trim()),
        })
      : addSupplier({
          id: 0,
          name,
          city,
          products: products.split(",").map((p) => p.trim()),
        });
    navigate("/suppliers");
  };
  return (
    <div className="container mt-5 px-5">
      <div
        className="card shadow border-0 mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <div
          className={`card-header py-3 bg-white border-bottom border-4 ${id ? "border-warning" : "border-info"}`}
        >
          <h4 className="fw-bold mb-0 text-dark">
            {id ? "Edit Supplier Details" : "Register New Supplier"}
          </h4>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold small text-uppercase text-muted">
                Supplier Name
              </label>
              <input
                type="text"
                className="form-control bg-light"
                placeholder="Company name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold small text-uppercase text-muted">
                City / Location
              </label>
              <input
                type="text"
                className="form-control bg-light"
                placeholder="City name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold small text-uppercase text-muted">
                Products
              </label>
              <textarea
                className="form-control bg-light"
                placeholder="Product A, Product B..."
                value={products}
                onChange={(e) => setProducts(e.target.value)}
                required
              />
              <div className="form-text small text-muted text-end">
                Separate with commas
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-light border px-4 fw-semibold text-muted"
                onClick={() => navigate("/suppliers")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`btn px-4 fw-bold shadow-sm text-white ${id ? "btn-warning" : "btn-info"}`}
              >
                {id ? "Update Supplier" : "Register Partner"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SuppliersForm;
