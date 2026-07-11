const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const express = require("express");
const router = express.Router();

const {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    searchBooks
} = require("../controllers/bookController");

router.post("/", protect, admin, addBook);

router.get("/", getBooks);

router.get("/search", searchBooks);   

router.get("/:id", getBookById);

router.put("/:id", protect, admin, updateBook);

router.delete("/:id", protect, admin, deleteBook);

module.exports = router;