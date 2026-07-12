import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AdminBooks() {

    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/books", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setBooks(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteBook = async (id) => {

        if (!window.confirm("Are you sure you want to delete this book?")) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/books/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Book Deleted Successfully");

            fetchBooks();

        } catch (error) {

            alert(error.response?.data?.message || "Delete Failed");

        }

    };

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="container py-5">

            {/* Header */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold mb-1">
                        📚 Manage Books
                    </h2>

                    <p className="text-muted mb-0">
                        Total Books : {filteredBooks.length}
                    </p>

                </div>

                <Link
                    to="/admin/books/add"
                    className="btn btn-success"
                >
                    ➕ Add Book
                </Link>

            </div>

            {/* Search */}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-body">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="🔍 Search by book title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

            </div>

            {/* Books Table */}

            <div className="card shadow border-0">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead className="table-dark">

                                <tr>

                                    <th>Title</th>

                                    <th>Author</th>

                                    <th>Genre</th>

                                    <th>Price</th>

                                    <th>Stock</th>

                                    <th className="text-center">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredBooks.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center py-4"
                                        >

                                            No Books Found 📚

                                        </td>

                                    </tr>

                                ) : (

                                    filteredBooks.map((book) => (

                                        <tr key={book._id}>

                                            <td className="fw-semibold">
                                                {book.title}
                                            </td>

                                            <td>{book.author}</td>

                                            <td>

                                                <span className="badge bg-primary">
                                                    {book.genre}
                                                </span>

                                            </td>

                                            <td>

                                                <span className="text-success fw-bold">
                                                    ₹{book.price}
                                                </span>

                                            </td>

                                            <td>

                                                <span
                                                    className={`badge ${
                                                        book.stock > 5
                                                            ? "bg-success"
                                                            : "bg-danger"
                                                    }`}
                                                >
                                                    {book.stock}
                                                </span>

                                            </td>

                                            <td className="text-center">

                                                <div className="d-flex justify-content-center gap-2">

                                                    <Link
                                                        to={`/admin/books/edit/${book._id}`}
                                                        className="btn btn-warning btn-sm"
                                                    >
                                                        ✏ Edit
                                                    </Link>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => deleteBook(book._id)}
                                                    >
                                                        🗑 Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminBooks;