import { Link } from "react-router-dom";


const Home = () => {
    return (
    <div className="container mt-5">
      <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
        <div className="container-fluid py-5 text-center">
          <h1 className="display-5 fw-bold text-primary">Welcome</h1>
          <p className="fs-4 text-secondary">React Routing Demo</p>
          
          <hr className="my-4" />

          <div className="row justify-content-center">
            <div className="col-md-8">
              <p className="lead text-dark">
                This project manages <strong>Products</strong> and <strong>Suppliers</strong> to 
                demonstrate my proficiency with <strong>React Routing</strong>. It showcases 
                dynamic navigation, nested routes, and efficient state handling within a 
                modern web architecture.
              </p>
            </div>
          </div>

          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-4">
            <Link to="/products" className="btn btn-outline-primary btn-lg px-4">
              View Products
            </Link>
            <Link to="/suppliers" className="btn btn-outline-secondary btn-lg px-4">
              View Suppliers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;