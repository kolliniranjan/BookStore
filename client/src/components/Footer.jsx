function Footer() {

    return (

        <footer className="bg-dark text-white mt-5">

            <div className="container py-5">

                <div className="row">

                    <div className="col-md-4">

                        <h4 className="fw-bold">
                            📚 BookStore
                        </h4>

                        <p className="text-light">
                            Your one-stop destination for Programming,
                            Novels, Self Help and many more books.
                        </p>

                    </div>

                    <div className="col-md-4">

                        <h5>Quick Links</h5>

                        <ul className="list-unstyled">

                            <li>🏠 Home</li>

                            <li>📚 Books</li>

                            <li>🛒 Cart</li>

                            <li>📦 Orders</li>

                        </ul>

                    </div>

                    <div className="col-md-4">

                        <h5>Technology</h5>

                        <ul className="list-unstyled">

                            <li>⚛ React</li>

                            <li>🟢 Node.js</li>

                            <li>🚀 Express.js</li>

                            <li>🍃 MongoDB</li>

                        </ul>

                    </div>

                </div>

                <hr className="border-secondary" />

                <div className="text-center">

                    <p className="mb-0">

                        © 2026 BookStore |
                        Developed by <strong>Niranjan</strong>

                    </p>

                </div>

            </div>

        </footer>

    );

}

export default Footer;