import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    // Front-end validators
    const isValidEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isStrongPassword = (password) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/.test(password);

    const handleRegister = async (e) => {
        e.preventDefault();

        // ===== Front-end validation =====
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Invalid email format.");
            return;
        }

        if (!isStrongPassword(password)) {
            setError("Password must be at least 8 characters long and include letters and numbers.");
            return;
        }
        // ===== End front-end validation =====

        try {
            const res = await axios.post("https://localhost:5000/api/auth/register", { email, password });
            setSuccess("Registration successful! You can now login.");
            setError("");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
            setSuccess("");
        }
    };

    return (
        <div className="auth-page">
            <div className="page-content">
                <h2>Register</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <form onSubmit={handleRegister}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
