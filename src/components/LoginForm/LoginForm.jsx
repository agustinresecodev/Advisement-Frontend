import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { loginUserCall } from "../../services/authCall";
import { useDispatch } from "react-redux";
import { login } from "../Slicers/userSlicer";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../helpers/validators";
import "./LoginForm.css";

export const LoginForm = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [loginError, setLoginError] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const loginMe = async () => {
    try {
      //esta será la función que desencadenará el login...
      if (
        validateEmail(userCredentials.email) == true &&
        validatePassword(userCredentials.password) == true
      ) {
        
        const answer = await loginUserCall(userCredentials);
        
        if (answer.data.message) {
          setLoginError("Wrong Credentials");
        } else
        if (answer.data.token) {
          
          //decodificamos el token...
          const uDecodificado = decodeToken(answer.data.token);
          const passport = {
            token: answer.data.token,
            decodificado: uDecodificado,
          };
          //llamamos al almacen de Redux dandole la instruccion de que realice un login con nuestro passport
          //dentro de la funcion "login" de userSlice, ese passport se recibe a traves del action.payload
          dispatch(login(passport));
          
          //redirigimos a la home
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }

        
      }else{
        if (validateEmail(userCredentials.email) != true) {
          setLoginError(validateEmail(userCredentials.email));
          return
        }else if(validatePassword(userCredentials.password) != true) {
          setLoginError(validatePassword(userCredentials.password));
          return  
        }else{

          setLoginError("Wrong Credentials");
        }
        
      }
      
    } catch (error) {
      console.log(error);

      if (error.code === "ERR_NETWORK") {
        setLoginError("Error de red. Inténtalo más tarde");
      } else {
        setLoginError("Usuario o contraseña incorrectos");
      }
    }
  };

  return (
    <div className="container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            name="email"
            className=""
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
      </Form>
      <p className="error">{loginError}</p>
      <Button variant="primary" type="submit" onClick={loginMe}>
        Submit
      </Button>
      
    </div>
  );
};
