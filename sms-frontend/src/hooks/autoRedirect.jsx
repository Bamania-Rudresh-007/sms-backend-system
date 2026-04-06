import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

    const token = JSON.parse(localStorage.getItem("token"));

    if(!token){
        return <Navigate to="/home" replace />
    }

    return <Outlet />;
}

export default ProtectedRoute;