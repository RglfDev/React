import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

const ProductsForm = () => {
  const { products, addProduct, updateProduct } = useContext(ProductContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const productToEdit = products.find((p) => p.id === Number(id));

  const [name, setName] = useState(productToEdit ? productToEdit.name : "");
  const [price, setPrice] = useState(productToEdit ? productToEdit.price : 0);
  const [category, setCategory] = useState(
    productToEdit ? productToEdit.category : "",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    id
      ? updateProduct({ id: Number(id), name, price, category })
      : addProduct({ name, price, category });

    navigate("/products");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div
              className={`card-header py-3 bg-white border-bottom border-4 ${id ? "border-warning" : "border-success"}`}
            >
              <h4 className="fw-bold mb-0 text-dark">
                {id ? "Update Product Details" : "Create New Product"}
              </h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold small text-uppercase text-muted">
                    Product Name
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-tag"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control bg-light border-start-0"
                      placeholder="Enter product name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold small text-uppercase text-muted">
                      Price
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        $
                      </span>
                      <input
                        type="number"
                        className="form-control bg-light border-start-0"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold small text-uppercase text-muted">
                      Category
                    </label>
                    <input
                      type="text"
                      className="form-control bg-light"
                      placeholder="Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                  <button
                    type="button"
                    className="btn btn-light border px-4 fw-semibold text-muted"
                    onClick={() => navigate("/products")}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`btn px-4 fw-bold shadow-sm ${id ? "btn-warning" : "btn-success"}`}
                  >
                    {id ? "Save Changes" : "Register Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsForm;
