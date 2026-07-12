import { useEffect, useState } from "react";
import api from "../services/api";
import BookCard from "../components/BookCard";

function Home() {

    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("All");

    useEffect(() => {

        fetchBooks();

    }, []);

    const fetchBooks = async () => {

        try {

            const res = await api.get("/books");

            setBooks(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (
    <div className="container mt-4">

        <div
    className="p-5 mb-5 rounded-4 text-white"
    style={{
        background: "linear-gradient(135deg,#4f46e5,#7c3aed)"
    }}
>

    <div className="row align-items-center">

        <div className="col-md-8">

            <h1 className="display-4 fw-bold">
                📚 Welcome to BookStore
            </h1>

            <p className="lead mt-3">
                Discover Programming, Novels, Self Help and many more books.
            </p>

        </div>

        <div className="col-md-4 text-center">

            <h1 style={{ fontSize: "90px" }}>
                📖
            </h1>

        </div>

    </div>

</div>

        <div className="row mb-4">

    <div className="col-md-8 mx-auto">

        <div className="input-group input-group-lg">

            <span className="input-group-text">
                🔍
            </span>

            <input
                type="text"
                className="form-control"
                placeholder="Search your favourite book..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

        </div>

    </div>

</div>
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">

    {["All", "Programming", "Novel", "Self Help"].map((g) => (

        <button
            key={g}
            className={
                genre === g
                    ? "btn btn-primary"
                    : "btn btn-outline-primary"
            }
            onClick={() => setGenre(g)}
        >
            {g}
        </button>

    ))}

</div>

        <div className="d-flex justify-content-between align-items-center mb-4">

    <h3>Available Books</h3>

    <span className="badge bg-dark fs-6">
        {books.filter(book =>
            book.title.toLowerCase().includes(search.toLowerCase()) &&
            (genre === "All" || book.genre === genre)
        ).length} Books
    </span>

</div>
<div className="row">

    {books
        .filter((book) =>
            book.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter((book) =>
            genre === "All" || book.genre === genre
        )
        .map((book) => (

            <BookCard
                key={book._id}
                book={book}
            />

        ))}

</div>

    </div>
);
}

export default Home;