import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditBook() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState({
        title: "",
        author: "",
        genre: "",
        price: "",
        stock: "",
        description: "",
        image: ""
    });

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

    const handleChange = (e) => {

        setBook({
            ...book,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/books/${id}`,
                book,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Book Updated Successfully");

            navigate("/admin/books");

        } catch (error) {

            alert(error.response?.data?.message || "Update Failed");

        }

    };

    return (

        <div className="container mt-4">

            <h2>Edit Book</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="genre"
                    value={book.genre}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    type="number"
                    name="price"
                    value={book.price}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    type="number"
                    name="stock"
                    value={book.stock}
                    onChange={handleChange}
                />

                <textarea
                    className="form-control mb-3"
                    name="description"
                    value={book.description}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="image"
                    value={book.image}
                    onChange={handleChange}
                />

                <button
                    className="btn btn-warning"
                    type="submit"
                >
                    Update Book
                </button>

            </form>

        </div>

    );

}

export default EditBook;