import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { registerNewUserCall } from "../../services/authCall";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";
import {
  validateName,
  validatePassword,
  validatePhone,
  validateEmail,
} from "../../helpers/validators";

//RegisterForm component
export const RegisterForm = () => {
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  // const to store the user data
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  //handle the changes
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    
  };
  //handle the submit
  const handlerSubmit = (e) => {

    const registerUser = async () => {
      //validations
      if (
        validateName(userData.firstName) === true &&
        validateName(userData.lastName) === true &&
        validatePhone(userData.phone) === true &&
        validatePassword(userData.password) === true &&
        validateEmail(userData.email) === true
      ) {
        //call the service
        const response = await registerNewUserCall(userData);

        //if the response is 201, we redirect to login
        if (response.status === 201) {
          setTimeout(() => {
            navigate("/auth/login");
          }, 2000);
        }
      } else {
        //set the errors
        setFirstNameError(validateName(userData.firstName));
        setLastNameError(validateName(userData.lastName));
        setEmailError(validateEmail(userData.email));
        setPhoneError(validatePhone(userData.phone));
        setPasswordError(validatePassword(userData.password));
      }
    };

    //call the function
    registerUser();
  };

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
          <p className="error">{firstNameError}</p>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            onChange={handleChange}
            name="lastName"
          />
          <p className="error">{lastNameError}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            name="email"
          />
          <p className="error">{emailError}</p>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your phone Number"
            onChange={handleChange}
            name="phone"
          />
          <p className="error">{phoneError}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
          />
          <p className="error">{passwordError}</p>
        </Form.Group>

        <Button variant="primary" onClick={handlerSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
