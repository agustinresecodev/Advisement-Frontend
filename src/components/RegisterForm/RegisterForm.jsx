import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { registerNewUserCall } from "../../services/authCall";
import { Navigate, useNavigate } from "react-router-dom";

export const RegisterForm = () => {

    const navigate =useNavigate();

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
    });

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
        console.log(userData);
    }
    const handlerSubmit = (e) => {
       
        
            const registerUser= async () => {
                
                    const response = await registerNewUserCall(userData);
                    console.log(response);
                    if(response.status === 201){
                        setTimeout(()=> {
                            navigate("/auth/login")
                        }, 2000)
                    
                    }
            }
            registerUser();
    }
        
        
    
  
    return (
    <div className="container">
      <Form>
      <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            onChange={handleChange}
            name="firstName"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Enter your last name"
            onChange={handleChange}
            name="lastName"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            name="email"
          />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your phone Number"
            onChange={handleChange}
            name="phone"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
          />
        </Form.Group>
        
        <Button variant="primary" onClick={handlerSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
