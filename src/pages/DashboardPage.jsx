import { useEffect, useState, useContext } from "react";
import { getProtectedData } from "../api";
import { AuthContext } from "../AuthContext";

const DashboardPage = () => {
    const { userToken } = useContext(AuthContext);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getProtectedData(userToken);
                setMessage(data.message);
            } catch (err) {
                setMessage("Failed to load data");
            }
        };
        fetchData();
    }, [userToken]);

    return (
        <div className="page dashboard-page">
            <div className="card">
                <h2>Dashboard</h2>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default DashboardPage;
