import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { createClientCall } from "../../services/clientsCall";
import { useSelector } from "react-redux";
import { getUserData } from "../../components/Slicers/userSlicer";

export const CreateClient = () => {
    //read user data from the store
    const userData = useSelector(getUserData);
    const [clientData, setClientData] = useState({});

    const handleModal = (e) => {
        setClientData({
            ...clientData,
            [e.target.name]: e.target.value,
        });
       
    }

    const createClient = async () => {
      if (!clientData.name || !clientData.address || !clientData.phone || !clientData.email || !clientData.cif || !clientData.contactName) {
          alert("Please fill all the fields");
          return;
      }
        const response = await createClientCall(clientData,userData.token);
        if (response.status === 201) {
            alert("Client created successfully");
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
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={createClient}>Create Client</Button>

        </div>
    )
}