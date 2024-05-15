import { useSelector } from "react-redux"
import { getUserData } from "../../components/Slicers/userSlicer";
import { useEffect } from "react";
import { useState } from "react";
import { getSelfUser } from "../../services/usersCall";
export const Profile = () => {
    //read the state of userSlice
    
    const userPassport = useSelector(getUserData);
    

   
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        console.log("useEffect running")
        const userGetData = async () => {
            const response = await getSelfUser(userPassport.token);
            setUserData(response.data);
            console.log(userData);
        }
        userGetData();
    }, []);


    

    return (
        <div className="container">
            <div className="row">
                <h1>Profile</h1>
            </div>
            <div className="row">
                <h2>Personal Information</h2>
            </div>
            <div className="row">
                <p>First Name: {userData.firstName}</p>
            </div>
            <div className="row">
                <p>Last Name: {userData.lastName}</p>
            </div>
            <div className="row">
                <p>Email: {userData.email}</p>
            </div>
            <div className="row">
                <p>Phone: {userData.phone}</p>
            </div>
            <div className="row">
                <p>Role: {userData.role.name}</p>
            </div>

        </div>
    )
}