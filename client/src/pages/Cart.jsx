import { useEffect, useState } from "react";
import api from "../services/api";

function Cart() {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/cart", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCart(res.data);

        } catch (error) {

            console.log(error);

        }

    };
    const updateQuantity = async (id, quantity) => {

    try {

        const token = localStorage.getItem("token");

        await api.put(
            `/cart/${id}`,
            { quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        fetchCart();

    } catch (error) {

        console.log(error);

    }

};
const removeItem = async (id) => {

    try {

        const token = localStorage.getItem("token");

        await api.delete(`/cart/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        fetchCart();

    } catch (error) {

        console.log(error);

    }

};
const checkout = async () => {

    try {

        const token = localStorage.getItem("token");

        await api.post(
            "/orders",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Order Placed Successfully!");

        fetchCart();

    } catch (error) {

        alert(error.response?.data?.message || "Checkout Failed");

    }

};
      const total = cart.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
);
    return (

    <div className="container py-5">

        <h2 className="text-center fw-bold mb-5">
            🛒 My Shopping Cart
        </h2>

        {cart.length === 0 ? (

            <div className="text-center">

                <h3>Your Cart is Empty 📚</h3>

                <p className="text-muted">
                    Add some books to start shopping.
                </p>

            </div>

        ) : (

            <div className="row">

                <div className="col-lg-8">

                    {cart.map((item) => (

                        <div
                            key={item._id}
                            className="card shadow border-0 rounded-4 mb-4"
                        >

                            <div className="card-body p-4">

                                <div className="row align-items-center">

                                    <div className="col-md-3 text-center">

                                        <img
                                            src="https://placehold.co/200x250?text=📚"
                                            alt={item.book.title}
                                            className="img-fluid rounded"
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <h4 className="fw-bold">
                                            {item.book.title}
                                        </h4>

                                        <p className="text-muted">
                                            {item.book.author}
                                        </p>

                                        <span className="badge bg-primary">
                                            {item.book.genre}
                                        </span>

                                        <h4 className="text-success mt-3">
                                            ₹{item.book.price}
                                        </h4>

                                    </div>

                                    <div className="col-md-3 text-center">

                                        <div className="d-flex justify-content-center align-items-center gap-2">

                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() =>
                                                    updateQuantity(item._id, item.quantity - 1)
                                                }
                                            >
                                                -
                                            </button>

                                            <span className="fw-bold fs-5">
                                                {item.quantity}
                                            </span>

                                            <button
                                                className="btn btn-outline-success"
                                                onClick={() =>
                                                    updateQuantity(item._id, item.quantity + 1)
                                                }
                                            >
                                                +
                                            </button>

                                        </div>

                                        <button
                                            className="btn btn-danger mt-4 w-100"
                                            onClick={() => removeItem(item._id)}
                                        >
                                            🗑 Remove
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                <div className="col-lg-4">

                    <div
                        className="card shadow border-0 rounded-4 p-4"
                        style={{
                            position: "sticky",
                            top: "100px"
                        }}
                    >

                        <h3 className="mb-4">
                            Order Summary
                        </h3>

                        <hr />

                        <div className="d-flex justify-content-between">

                            <h5>Total</h5>

                            <h4 className="text-success">
                                ₹{total}
                            </h4>

                        </div>

                        <button
                            className="btn btn-success btn-lg mt-4 w-100"
                            onClick={checkout}
                        >
                            Proceed to Checkout
                        </button>

                    </div>

                </div>

            </div>

        )}

    </div>

);

}

export default Cart;