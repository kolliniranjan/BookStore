import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/orders", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setOrders(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const getStatusColor = (status) => {

        switch (status) {

            case "Pending":
                return "warning";

            case "Confirmed":
                return "info";

            case "Packed":
                return "secondary";

            case "Shipped":
                return "primary";

            case "Delivered":
                return "success";

            case "Cancelled":
                return "danger";

            default:
                return "dark";

        }

    };

    return (

        <div className="container py-5">

            <h2 className="text-center fw-bold mb-5">
                📦 My Orders
            </h2>

            {orders.length === 0 ? (

                <div className="text-center">

                    <h3>No Orders Yet</h3>

                    <p className="text-muted">
                        Place your first order to see it here.
                    </p>

                </div>

            ) : (

                orders.map((order) => (

                    <div
                        key={order._id}
                        className="card shadow border-0 rounded-4 mb-4"
                    >

                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h5 className="fw-bold">
                                        Order ID
                                    </h5>

                                    <small className="text-muted">
                                        {order._id}
                                    </small>

                                </div>

                                <span
                                    className={`badge bg-${getStatusColor(order.status)} fs-6`}
                                >
                                    {order.status}
                                </span>

                            </div>

                            <hr />

                            <h4 className="text-success">
                                ₹{order.totalPrice}
                            </h4>

                            <p className="text-muted">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </p>

                            <h5 className="mt-4 mb-3">
                                Books
                            </h5>

                            {order.items.map((item) => (

                                <div
                                    key={item._id}
                                    className="border rounded p-3 mb-2"
                                >

                                    <div className="d-flex justify-content-between">

                                        <strong>
                                            {item.book?.title || "Book Deleted"}
                                        </strong>

                                        <span>
                                            Qty : {item.quantity}
                                        </span>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                ))

            )}

        </div>

    );

}

export default Orders;