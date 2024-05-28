import {Navigate, Route, Routes} from "react-router-dom"
import { Home } from "../Home/Home"
import { Login } from "../Auth/Login/Login"
import { Register } from "../Auth/Register/Register"
import { Cases } from "../Cases/Cases"
import { Clients } from "../Clients/Clients"
import { CreateClient } from "../CreateClient/CreateClient"
import { Profile } from "../Profile/Profile"
import { PrivateRoutes } from "../../components/PrivateRoutes/PrivateRoutes"
import { CreateCases } from "../Cases/CreateCases/CreateCases"
import { Admin } from "../Admin/Admin"
import { Users } from "../Users/Users"





export const Body = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login/>}/>
        <Route path="/auth/register" element={<Register/>}/>
        <Route path="/cases" element={<PrivateRoutes Children={Cases} roles={["admin","administration","technicians"]}/>} />
        <Route path="/cases/create" element={<PrivateRoutes Children={CreateCases} roles={['admin','administration']} />} />
        <Route path="/clients" element={<PrivateRoutes Children={Clients} roles={['admin','administration']}/>} />
        <Route path="/clients/create" element={<PrivateRoutes Children={CreateClient} roles={['admin','administration']} />} />
        <Route path="/admin" element={<PrivateRoutes Children={Admin} roles={['admin','administration']} />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/admin/users" element={<Users/>}/>
        <Route path="*" element={<Navigate to="/" />} />
        
    </Routes>
  )
}