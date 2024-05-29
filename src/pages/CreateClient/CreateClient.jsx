import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { createClientCall } from "../../services/clientsCall";
import { useSelector } from "react-redux";
import { getUserData } from "../../components/Slicers/userSlicer";
import { validateAddress, validateCif, validateEmail, validateName, validatePhone } from "../../helpers/validators";
import "./CreateClient.css";
import { useNavigate } from "react-router-dom";

export const CreateClient = () => {
    //read user data from the store
    const userData = useSelector(getUserData);
    const [clientData, setClientData] = useState({});
    const [nameError, setNameError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [cifError, setCifError] = useState("");
    const [contactNameError, setContactNameError] = useState("");

    const navigate = useNavigate();


    const handleModal = (e) => {
        setClientData({
            ...clientData,
            [e.target.name]: e.target.value,
        });
       
    }

    const createClient = async () => {
      if (!clientData.name || !clientData.address || !clientData.phone || !clientData.email || !clientData.cif || !clientData.contactName) {
          validateName(clientData.name) === true ? setNameError("") : setNameError(validateName(clientData.name));
          validateAddress(clientData.address) === true ? setAddressError("") : setAddressError(validateAddress(clientData.address));
          validatePhone(clientData.phone) === true ? setPhoneError("") : setPhoneError(validatePhone(clientData.phone));
          validateEmail(clientData.email) === true ? setEmailError("") : setEmailError(validateEmail(clientData.email));
          validateName(clientData.cif) === true ? setCifError("") : setCifError(validateCif(clientData.cif));
          validateName(clientData.contactName) === true ? setContactNameError("") : setContactNameError(validateName(clientData.contactName));
          return;
      }
        const response = await createClientCall(clientData,userData.token);
        if (response.status === 201) {
            alert("Client created successfully");
            navigate("/clients")
        } else {
            alert("There was an error creating the client");
        }
    }

    return (
        <div className="container">
            <h1>Create Client</h1>
            <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={clientData.name}
                placeholder="Name"
                onChange={handleModal}
              />
              <p className="error">{nameError}</p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={clientData.address}
                placeholder="Address"
                onChange={handleModal}
              />
              <p className="error">{addressError}</p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={clientData.phone}
                placeholder="Phone"
                onChange={handleModal}
              />
              <p className="error">{phoneError}</p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={clientData.email}
                placeholder="Email"
                onChange={handleModal}
              />
              <p className="error">{emailError}</p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CIF</Form.Label>
              <Form.Control
                type="text"
                name="cif"
                value={clientData.cif}
                placeholder="CIF"
                onChange={handleModal}
              />
              <p className="error">{cifError}</p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Person</Form.Label>
              <Form.Control
                type="text"
                name="contactName"
                value={clientData.contactName}
                placeholder="Contact Person"
                onChange={handleModal}
              />
              <p className="error">{contactNameError}</p>
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={createClient}>Create Client</Button>

        </div>
    )
}