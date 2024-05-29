import { Modal,Button } from "react-bootstrap";


export const DeleteUserModal = ({handleSeeDeleteClose,showDelete,handlerDeleteUser}) => {

    

  return (
    <Modal size="lg"
    show={showDelete}
    onHide={handleSeeDeleteClose}
    backdrop="static"
    keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>User Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>Are you sure to delete this user?</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSeeDeleteClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handlerDeleteUser}>Delete User</Button>
      </Modal.Footer>
    </Modal>
  );
};
