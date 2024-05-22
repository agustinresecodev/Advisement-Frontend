import { useSelector } from "react-redux"
import { getUserData } from "../../components/Slicers/userSlicer";

export const Home = () => {

    //leemos el estado de userSlice
    const userData = useSelector(getUserData);
   

    
    
    return (
        <div className="container">
            <h1>Welcome to Adviseme {userData.decodificado.userName}</h1>
            <p>this project where you will be able to manage your HelpDesk department </p>
            <p>you can create clients, cases, and manage your profile</p>

            
        </div>
    )
}