import { useEffect, useState } from "react";
import {
  getAllClientsCall,
  getClientById,
  editClientCall,
  deleteClientCall,
} from "../../services/clientsCall";
import Form from "react-bootstrap/Form";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { getUserData } from "../Slicers/userSlicer";
import { set } from "date-fns";

export const ClientList = () => {

  //Use selector to get the user data
  const userData = useSelector(getUserData);

  const [clients, setClients] = useState([0,0]);
  const [clientData, setClientData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingMe, setIsEditingMe] = useState("");
  //const for the filtered clients
  const [filteredClients, setFilteredClients] = useState([]);
  //use effect to call the clients
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    
    const callClients = async () => {      
        const response = await getAllClientsCall(userData.token);       
          setClients(response.data);
          setFilteredClients(response.data);   
          setFlag(true);       
    };
    console.log(flag);
    if(!flag){
      callClients();
    }
    
    
  }, [flag]);

  

  // Function to filter the clients
  const handleChange = (e) => {
    const filtered = clients.filter((client) =>
      client.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredClients(filtered);
  };

  //Function to edit a client
  const editClient = async (id) => {
    console.log(id);
    const selectedClient = await getClientById(id, userData.token);

    setClientData(selectedClient.data);
    setShow(true);
  };

  //Edit Modal variables and functions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleModal = (e) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    });
    console.log(clientData);
  };

  const editHandler = async () => {
    const response = await editClientCall(clientData.id, clientData);
    if (response.status === 200) {
      console.log("Client edited");
      handleClose();
      setFlag(false);
    }
  };

  //Modal for deleting a client
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const deleteHandler = async () => {
    const response = await deleteClientCall(deleteId, userData.token);
    if (response.status === 200) {
      alert("Client deleted");
      handleCloseDelete(response.data.id);
      setFlag(false);
    }
  };

  //Headers de la tabla
  const headers = [
    {
      name: "id",
      label: "ID",
      selector: (row) => row.id,
    },
    {
      name: "name",
      label: "Name",
      selector: (row) => row.name,
    },
    {
      name: "email",
      label: "Email",
      selector: (row) => row.email,
    },
    {
      name: "phone",
      label: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "address",
      label: "Address",
      selector: (row) => row.address,
    },
    {
      name: "cif",
      label: "CIF",
      selector: (row) => row.cif,
    },
    {
      name: "contact",
      label: "Contact",
      selector: (row) => row.contactName,
    },
    {
      name: "Options",
      cell: (row) => (
        <>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => editClient(row.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fillRule="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleShowDelete(row.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fillRule="currentColor"
              className="bi bi-person-dash-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"
              />
              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container">
      <h1>Client List</h1>
      <input type="text" placeholder="Search by name" onChange={handleChange} />
      <DataTable
        columns={headers}
        data={filteredClients}
        pagination
        fixedHeader
        striped
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Client</Modal.Title>
          <Modal.Body>
            <p>Are you sure you want to delete this client?</p>
            <Button variant="danger" onClick={()=>{deleteHandler(deleteId)}}>
              Delete
            </Button>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    </div>
  );
};
