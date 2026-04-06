import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
            <div className="text-center mb-4">
                <h2 className="display-4 fw-bold">Welcome</h2>
                <p className="lead text-muted">Events and Participants Management System</p>
            </div>

            <div className="d-flex gap-3">
                <Link to="/events" className="btn btn-primary btn-lg px-4 shadow-sm">
                    Go to Events
                </Link>
                <Link to="/participants" className="btn btn-success btn-lg px-4 shadow-sm">
                    Go to Participants
                </Link>
            </div>
        </div>
    );
};

export default Home;