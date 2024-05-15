import {Navigate, Route, Routes} from "react-router-dom"
import { Home } from "../Home/Home"
import { Login } from "../Auth/Login/Login"
import { Register } from "../Auth/Register/Register"
import { Cases } from "../Cases/Cases"
import { Clients } from "../Clients/Clients"
import { CreateClient } from "../CreateClient/CreateClient"
import { Profile } from "../Profile/Profile"



export const Body = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login/>}/>
        <Route path="/auth/register" element={<Register/>}/>
        <Route path="/cases" element={<Cases />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/create" element={<CreateClient />} />
        <Route path="/profile" element={<Profile/>}/>

        <Route path="*" element={<Navigate to="/" />} />
        
    </Routes>
  )
}