import { Link } from "react-router-dom";
import api from "../services/api";

function BookCard({ book }) {

    const addToCart = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please login first");
                return;
            }

            await api.post(
                "/cart",
                {
                    book: book._id,
                    quantity: 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Book added to cart!");

        } catch (error) {

            alert(error.response?.data?.message || "Failed to add to cart");

        }

    };

    return (

        <div className="col-md-4 mb-4">

            <div
                className="card h-100 shadow-sm border-0 book-card"
                style={{
                    borderRadius: "18px",
                    transition: "0.3s"
                }}
            >

                <Link to={`/books/${book._id}`}>

                    <img
                        src="https://placehold.co/400x500?text=📚+Book"
                        alt={book.title}
                        className="card-img-top"
                        style={{
                            height: "300px",
                            objectFit: "cover",
                            borderTopLeftRadius: "18px",
                            borderTopRightRadius: "18px"
                        }}
                    />

                </Link>

                <div className="card-body d-flex flex-column">

                    <div className="d-flex justify-content-between mb-2">

                        <span className="badge bg-primary">
                            {book.genre}
                        </span>

                        <span className="badge bg-success">
                            ₹{book.price}
                        </span>

                    </div>

                    <h5 className="fw-bold">
                        {book.title}
                    </h5>

                    <p className="text-muted mb-1">
                        {book.author}
                    </p>

                    <p className="small text-secondary">
                        {book.description}
                    </p>

                    <div className="mt-auto d-flex gap-2">

                        <Link
                            to={`/books/${book._id}`}
                            className="btn btn-outline-primary w-50"
                        >
                            Details
                        </Link>

                        <button
                            className="btn btn-primary w-50"
                            onClick={addToCart}
                        >
                            Cart
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default BookCard;