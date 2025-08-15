import axios from "axios";

const API_BASE = "https://localhost:5000/api";

export const registerUser = (email, password) =>
    axios.post(`${API_BASE}/auth/register`, { email, password });

export const loginUser = (email, password) =>
    axios.post(`${API_BASE}/auth/login`, { email, password });

export const getProtectedData = (token) =>
    axios.get(`${API_BASE}/protected`, {
        headers: { Authorization: `Bearer ${token}` },
    });
