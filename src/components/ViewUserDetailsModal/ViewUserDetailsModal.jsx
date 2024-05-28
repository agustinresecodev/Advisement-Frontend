import { Modal,Button } from "react-bootstrap";

export const ViewUserDetailsModal = ({ user, showDetails,handleSeeDetailsClose}) => {
  return (
    <Modal size="lg"
    show={showDetails}
    onHide={handleSeeDetailsClose}
    backdrop="static"
    keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5 className="d-flex justify-content-center">User Info</h5>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Active: {user.isActive ? "Yes" : "No"}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSeeDetailsClose}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>
  );
};
