import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../App.css"; // 

function Layout({ children }) {
    const { logout } = useAuth();

    return (
        <div className="app-container">
            <nav className="navbar">
                <div className="brand">MyApp</div>
                <div className="navbar-links">
                    <Link to="/">Home</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </div>
                <button onClick={logout}>Logout</button>
            </nav>
            <main className="main-content">{children}</main>
        </div>
    );
}

export default Layout;
