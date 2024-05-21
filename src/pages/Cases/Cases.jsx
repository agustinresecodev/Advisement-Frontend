import { useEffect, useState } from "react";
import { getAllCases, getCaseById,editCaseCall } from "../../services/caseCall";
import { getAllClientsCall, getClientById } from "../../services/clientsCall";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CaseDetailsModal } from "../../components/CaseDetailsModal/CaseDetailsModal";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";
import { set } from "date-fns";
import { getAllTechs, getUserById } from "../../services/usersCall";
import { getUserData } from "../../components/Slicers/userSlicer";
import { useSelector } from "react-redux";

export const Cases = () => {
  //read the token from the store
 const userData = useSelector(getUserData);

  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);

  useEffect(() => {
    const getCases = async () => {
      const response = await getAllCases(userData.token);
      setCases(response.data);
      setFilteredCases(response.data);
    };
    getCases();
  }, []);

  //Headers de la tabla
  const headers = [
    {
      name: "ID",
      label: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Client Name",
      label: "Client Name",
      selector: (row) => row.client.name,
      sortable: true,
    },
    {
      name: "Description",
      label: "description",
      selector: (row) => row.description,
    },
    {
      name: "Address",
      label: "Address",
      selector: (row) => row.client.address,
    },
    {
      name: "Status",
      label: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <>
          <span>{row.status === true ? "Resolved" : "Pending"}</span>
        </>
      ),
      sortable: true,
    },
    {
      name: "Creation Date",
      label: "Creation Date",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "Options",
      cell: (row) => (
        <>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              handleSeeDetails(row.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fillRule="currentColor"
              className="bi bi-eye"
              viewBox="0 0 16 16"
            >
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
            </svg>
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              handleSeeEdit(row.id);
            }}
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
            onClick={() => {
              console.log("Delete");
            }}
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
  // Function to filter the clients
  const handleChange = (e) => {
    const filtered = cases.filter((cas) =>
      cas.client.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(filtered);
    setFilteredCases(filtered);
  };

  // Details Modal Functions
  const [caseData, setCaseData] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const handleSeeDetailsClose = () => setShowDetails(false);
  const handleSeeDetailsShow = () => setShowDetails(true);
  const handleSeeDetails = async (id) => {
    const response = await getCaseById(id,userData.token);
    setCaseData(response.data);
    handleSeeDetailsShow();
  };

  //Edit Modal Functions
  const [showEdit, setShowEdit] = useState(false);
  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = () => setShowEdit(true);
  const handleSeeEdit = async (id) => {
    const response = await getCaseById(id,userData.token);
    setCaseData(response.data);
    handleEditShow();
    getClients();
    getTechs();
  };
  const handleEditModal = (e) => {
    setCaseData({
      ...caseData,
      [e.target.name]: e.target.value,
    });
    
  };

  //Get Clients
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  //Get all clients for the select
  const getClients = async () => {
    const response = await getAllClientsCall(userData.token);
    setClients(response.data);
    setFilteredClients(response.data);
  }
  //Filter clients
  const clientFilter = (e) => {
    const filtered = clients.filter((client) =>
      client.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredClients(filtered);
  }
  //set the client to the case
  const [selectedClient, setSelectedClient] = useState(null);

  
  useEffect(() => {
    if (selectedClient) {
      setCaseData({
        ...caseData,
        client: selectedClient,
      });
    }
  }, [selectedClient]);

  //Get the client by id
  const getClientsById = async (id) => {
    const response = await getClientById(id);
    setCaseData({
      ...caseData,
      client: response.data,
    });
  }

  //Handler for the client select and change the client info
  const handlerClientChange = (e) => {
    setSelectedClient(e.target.value);
    getClientsById(e.target.value);    
  }

  //Get the tech by id
  const getTechById = async (id) => {
    const response = await getUserById(id);
    setCaseData({
      ...caseData,
      user: response.data,
    });
  }

  //Filter the techs
  const [techs, setTechs] = useState([]);
  const [filteredTechs, setFilteredTechs] = useState([]);
  
  const techFilter = (e) => {
    const filtered = techs.filter((tech) =>
      tech.firstName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredTechs(filtered);
  }

  //Set the tech to the case
  const [selectedTech, setSelectedTech] = useState(null);

  useEffect(() => {
    if (selectedTech) {
      setCaseData({
        ...caseData,
        user: selectedTech,
      });
    }
  }, [selectedTech]);

  //Handler for the tech select and change the tech info
  const handlerTechChange = (e) => {
    setSelectedTech(e.target.value);
    getTechById(e.target.value);
  }

  //Get all techs for the select
  const getTechs = async () => {
    const response = await getAllTechs(userData.token);
    setTechs(response.data);
    setFilteredTechs(response.data);
    console.log(response.data);
  }

  //Edit Modal Functions
  const editCase = async (id) => {
    
      const editedCase = {
        description: caseData.description,
        status: caseData.status,
        initialDate: caseData.initialDate,
        finalDate: caseData.finalDate,
        clientId: caseData.client.id,
        userId: caseData.user.id,
      };
      try {
      const response = await editCaseCall(id, editedCase, userData.token);
      
    }catch (error) {
      console.log(error);
    }
    

    

  }
  
  


  return (
    <div className="container">
      <input
        type="text"
        placeholder="Filter By Client Name"
        onChange={handleChange}
      />
      <div>
        <h1>Cases</h1>
        <DataTable
          title="Cases"
          columns={headers}
          data={filteredCases}
          pagination
          highlightOnHover
          responsive
          striped
        />

        {/* Details Modal */}
        <CaseDetailsModal
          caseData={caseData}
          showDetails={showDetails}
          handleSeeDetailsClose={handleSeeDetailsClose}
        />

        {/*Edit Modal*/}
        <Modal
          size="lg"
          show={showEdit}
          onHide={handleSeeEdit}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Case Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h5>Case Info</h5>
              <div>
                <InputGroup>
                  <InputGroup.Text>Description</InputGroup.Text>
                  <Form.Control as="textarea" aria-label="With textarea" onChange={handleEditModal} name="description" value={caseData.description}/>
                </InputGroup>
              </div>
              <p>Status</p>
              <Form.Select aria-label="Status" onChange={handleEditModal} name="status">
                <option>Open this select menu</option>
                <option value="true">Completed</option>
                <option value="false">Pending</option>
              </Form.Select>

              <h5>Client</h5>
              <input type="text" onChange={clientFilter} name="name"/>
              <select name="client.id" onChange={handlerClientChange}>
                {filteredClients.map((client) => (
                  <option value={client.id}>{client.name}</option>
                ))}
              </select>
              

            </div>
            <div>
              <h5>Client Info</h5>
              <p>Name: {caseData.client?.name}</p>
              <p>Address: {caseData.client?.address}</p>
              <p>Phone: {caseData.client?.phone}</p>
              <p>Email: {caseData.client?.email}</p>
              <p>Contact:{caseData.client?.contactName}</p>
            </div>
            <div>
              <h5>Tech info</h5>
              <input type="text" onChange={techFilter} name="name"/>
              <select name="user.id" onChange={handlerTechChange}>
                {filteredTechs.map((tech) => (
                  <option value={tech.id}>{tech.firstName} {tech.lastName}</option>
                ))}
              </select>
              <p>Tech Name: {caseData.user?.firstName} {caseData.user?.lastName}</p>
              
              <p>Tech Email: {caseData.user?.email}</p>
              <p>Tech Phone: {caseData.user?.phone}</p>
            </div>
            <div>
            <h3>initialDate</h3>
              <input type="date"  onChange={handleEditModal} name="initialDate" value={caseData.initialDate}/>
            
            <h3>finalDate</h3>
              <input type="date"  onChange={handleEditModal} name="finalDate" value={caseData.finalDate}/>
            </div>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>{editCase(caseData.id)}}>Edit Case</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
