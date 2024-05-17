import { useEffect, useState } from "react";
import { getAllCases, getCaseById } from "../../services/caseCall";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const Cases = () => {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);

  useEffect(() => {
    const getCases = async () => {
      const response = await getAllCases();
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
              console.log("Edit");
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
    const response = await getCaseById(id);
    setCaseData(response.data);
    handleSeeDetailsShow();
  };

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
        <Modal
          size="lg"
          show={showDetails}
          onHide={handleSeeDetailsClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Case Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h5>Case Info</h5>
              <p>Description: {caseData.description}</p>
              <p>Status: {caseData.status === true ? "Resolved" : "Pending"}</p>
              <p>Creation Date: {caseData.createdAt}</p>
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
                <p>
                    Tech Name: {caseData.user?.name}
                </p>
                <p>
                    Tech Email: {caseData.user?.email}
                </p>
                <p>
                    Tech Phone: {caseData.user?.phone}
                </p>

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleSeeDetailsClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
