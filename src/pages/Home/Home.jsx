import { useSelector } from "react-redux"
import { getUserData } from "../../components/Slicers/userSlicer";

export const Home = () => {

    //leemos el estado de userSlice
    const userData = useSelector(getUserData);

    
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}