import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddBook() {

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

            await api.post(
                "/books",
                book,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Book Added Successfully");

            navigate("/admin/books");

        } catch (error) {

            alert(error.response?.data?.message || "Failed to add book");

        }

    };

    return (

        <div className="container mt-4">

            <h2>Add Book</h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="author"
                    placeholder="Author"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="genre"
                    placeholder="Genre"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    type="number"
                    name="price"
                    placeholder="Price"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    onChange={handleChange}
                />

                <textarea
                    className="form-control mb-3"
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="image"
                    placeholder="Image Name"
                    onChange={handleChange}
                />

                <button
                    className="btn btn-success"
                    type="submit"
                >
                    Add Book
                </button>

            </form>

        </div>

    );

}

export default AddBook;