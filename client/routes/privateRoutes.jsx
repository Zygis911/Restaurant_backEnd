import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PrivateRoute({children, roles}) {
    const {  isLoading, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading && (!user || !roles.include(user.role))) {
            navigate('/')
        }
    },[isLoading, user, roles, navigate])

    if(isLoading) {
        return null
    }
    return children;
}


export default PrivateRoute;