import { Link } from "react-router-dom";

function NotFound() {

    return (

        <div className="container text-center py-5">

            <h1
                className="display-1 fw-bold text-primary"
            >
                404
            </h1>

            <h2 className="mb-3">
                Oops! Page Not Found
            </h2>

            <p className="text-muted mb-4">
                The page you are looking for doesn't exist.
            </p>

            <Link
                to="/"
                className="btn btn-primary btn-lg"
            >
                🏠 Back to Home
            </Link>

        </div>

    );

}

export default NotFound;