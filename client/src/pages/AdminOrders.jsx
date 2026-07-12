import { useEffect, useState } from "react";
import api from "../services/api";

function AdminOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/orders/admin/all", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setOrders(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const updateStatus = async (id, status) => {

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/orders/${id}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Order Updated Successfully");

            fetchOrders();

        } catch (error) {

            alert(error.response?.data?.message || "Update Failed");

        }

    };

    return (

        <div className="container py-5">

            <div className="text-center mb-5">

                <h2 className="fw-bold">
                    📦 Manage Orders
                </h2>

                <p className="text-muted">
                    View and update customer orders
                </p>

            </div>

            {orders.length === 0 ? (

                <div className="text-center">

                    <h4>No Orders Found</h4>

                </div>

            ) : (

                orders.map((order) => (

                    <div
                        key={order._id}
                        className="card shadow border-0 rounded-4 mb-4"
                    >

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-8">

                                    <h5 className="fw-bold">
                                        📦 Order
                                    </h5>

                                    <p className="text-muted">
                                        {order._id}
                                    </p>

                                    <hr />

                                    <h5>
                                        👤 {order.user.name}
                                    </h5>

                                    <p>
                                        📧 {order.user.email}
                                    </p>

                                    <h5 className="text-success">
                                        ₹{order.totalPrice}
                                    </h5>

                                    <p className="text-muted">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>

                                </div>

                                <div className="col-md-4">

                                    <label className="form-label">
                                        Status
                                    </label>

                                    <select
                                        className="form-select"
                                        defaultValue={order.status}
                                        onChange={(e) =>
                                            updateStatus(
                                                order._id,
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option>Pending</option>
                                        <option>Confirmed</option>
                                        <option>Packed</option>
                                        <option>Shipped</option>
                                        <option>Delivered</option>
                                        <option>Cancelled</option>

                                    </select>

                                </div>

                            </div>

                        </div>

                    </div>

                ))

            )}

        </div>

    );

}

export default AdminOrders;