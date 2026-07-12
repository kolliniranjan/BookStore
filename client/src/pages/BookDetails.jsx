import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

function BookDetails() {

    const { id } = useParams();

    const [book, setBook] = useState(null);

    useEffect(() => {
        fetchBook();
    }, []);

    const fetchBook = async () => {

        try {

            const res = await api.get(`/books/${id}`);

            setBook(res.data);

        } catch (error) {

            console.log(error);

        }

    };

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

            alert("Book Added To Cart!");

        } catch (error) {

            alert(error.response?.data?.message || "Failed");

        }

    };

    if (!book) {

    return <LoadingSpinner />;

}

    return (

        <div className="container mt-5">

            <div className="card shadow-lg border-0 rounded-4">

                <div className="row g-0">

                    <div className="col-md-4 text-center p-4">

                        <img
                            src="https://placehold.co/350x500?text=📚+Book"
                            alt={book.title}
                            className="img-fluid rounded"
                        />

                    </div>

                    <div className="col-md-8">

                        <div className="card-body p-5">

                            <span className="badge bg-primary mb-3">
                                {book.genre}
                            </span>

                            <h2 className="fw-bold">
                                {book.title}
                            </h2>

                            <h5 className="text-muted">
                                {book.author}
                            </h5>

                            <hr />

                            <h3 className="text-success">
                                ₹{book.price}
                            </h3>

                            <p className="mt-3">
                                {book.description}
                            </p>

                            <h6>
                                📦 Stock :
                                <span className="text-success">
                                    {" "} {book.stock}
                                </span>
                            </h6>

                            <button
                                className="btn btn-primary btn-lg mt-4"
                                onClick={addToCart}
                            >
                                🛒 Add To Cart
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default BookDetails;