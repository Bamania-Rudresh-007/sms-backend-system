import { Navigate, Outlet } from "react-router-dom";
import { useUsers } from "../contexts/UsersContext.jsx";

const ProtectedRoute = () => {
    const {token} = useUsers();
    // const token = localStorage.getItem("token");

    if(!token && token !== "null"){
        return <Navigate to="/login" replace />
    }

    return <Outlet />;
}

export default ProtectedRoute;