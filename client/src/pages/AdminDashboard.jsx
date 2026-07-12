import { Link } from "react-router-dom";

function AdminDashboard() {

    return (

        <div className="container py-5">

            <div className="text-center mb-5">

                <h1 className="fw-bold">
                    👨‍💼 Admin Dashboard
                </h1>

                <p className="text-muted">
                    Manage your bookstore efficiently
                </p>

            </div>

            <div className="row g-4">

                <div className="col-md-6">

                    <div className="card border-0 shadow rounded-4 h-100">

                        <div className="card-body text-center p-5">

                            <div
                                className="mb-3"
                                style={{ fontSize: "60px" }}
                            >
                                📚
                            </div>

                            <h3 className="fw-bold">
                                Manage Books
                            </h3>

                            <p className="text-muted">
                                Add, edit and delete books from your store.
                            </p>

                            <Link
                                to="/admin/books"
                                className="btn btn-primary btn-lg mt-3"
                            >
                                Open Books
                            </Link>

                        </div>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card border-0 shadow rounded-4 h-100">

                        <div className="card-body text-center p-5">

                            <div
                                className="mb-3"
                                style={{ fontSize: "60px" }}
                            >
                                📦
                            </div>

                            <h3 className="fw-bold">
                                Manage Orders
                            </h3>

                            <p className="text-muted">
                                Track and update customer orders.
                            </p>

                            <Link
                                to="/admin/orders"
                                className="btn btn-success btn-lg mt-3"
                            >
                                Open Orders
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;