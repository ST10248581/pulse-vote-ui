import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check token on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser({ token }); // Minimal representation; you can expand
        }
    }, []);

    const login = async (email, password) => {
        const res = await axios.post("https://localhost:5000/api/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        setUser({ token: res.data.token });
    };

    const register = async (email, password) => {
        const res = await axios.post("https://localhost:5000/api/auth/register", { email, password });
        localStorage.setItem("token", res.data.token);
        setUser({ token: res.data.token });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Add this export
export const useAuth = () => useContext(AuthContext);
