import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserData } from "../../components/Slicers/userSlicer";


export const AuthRoutes = ({Children}) => {
    const userData = useSelector(getUserData);
    return (
        <>
            {userData.token ? <Children/> : <Navigate to="/login"/>}
        </>
    )
}