import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserData } from "../Slicers/userSlicer";


export const PrivateRoutes = ({Children,roles}) => {
    const userData = useSelector(getUserData);
    const userRole = userData.decodificado.userRole;
    return (
        <>
            {!userData.token ?<Navigate to="/login"/>: roles.includes(userRole)? <Children/> : <Navigate to="/login"/>} 
        </>
    )
}