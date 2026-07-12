import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/auth/login", formData);

            login(res.data.token);

            alert("Login Successful");

            navigate("/");

        } catch (error) {

            alert(error.response?.data?.message || "Login Failed");

        }

    };

    return (

        <div className="row justify-content-center mt-5">

            <div className="col-md-5">

                <div className="card shadow p-4">

                    <h2 className="text-center mb-4">
                        Login
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter Email"
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Password</label>

                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter Password"
                                onChange={handleChange}
                            />

                        </div>

                        <button
                            className="btn btn-primary w-100"
                            type="submit"
                        >
                            Login
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default Login;