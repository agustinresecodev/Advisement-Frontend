import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


export const CaseDetailsModal = ({ caseData, showDetails,handleSeeDetailsClose }) => {

return (

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
)
}