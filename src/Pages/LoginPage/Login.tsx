import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Hook for navigation

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent form submission default behavior

        try {
            const response = await axios.post("http://localhost:5282/api/Auth/login", {
                username,
                password,
            });

            const { token } = response.data;

            // Store the token in localStorage
            localStorage.setItem("token", token);

            // Navigate to the admin page after successful login
            navigate("/admin");
        } catch (error) {
            console.error("Login failed:", error);
            setError("Invalid username or password");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
