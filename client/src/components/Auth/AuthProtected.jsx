import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AuthProtected = ({children}) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ?  <Navigate to="/" /> : children;
    
}

export default AuthProtected