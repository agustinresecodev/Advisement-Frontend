import { useSelector } from "react-redux";
import { getUserData  } from "../../components/Slicers/userSlicer";
import { useEffect } from "react";
import { useState } from "react";
import { getSelfUser } from "../../services/usersCall";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { editSelfProfile } from "../../services/usersCall";
export const Profile = () => {
  //Modal variables and functions
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //read the state of userSlice
  const userPassport = useSelector(getUserData);

  const [userData, setUserData] = useState([]);
  const [userDataCopy, setUserDataCopy] = useState([]);

  useEffect(() => {
    console.log("useEffect running");
    const userGetData = async () => {
      const response = await getSelfUser(userPassport.token);
        setUserData(response.data);
        setUserDataCopy(response.data);
      console.log(userData);
      console.log(response.data);
    };
    userGetData();
  }, []);

  useEffect(() => {
    console.log("useEffect running");
    console.log(show)
  },[show])

  
// Editing the user profile variables and functions
const handleModal = (e) => {
    setUserDataCopy({
      ...userDataCopy,
      [e.target.name]: e.target.value,
    });
    console.log(userData);
  };

const handleEdit = async () => {
    const response = await editSelfProfile(userDataCopy, userPassport.token);
    console.log(response);
    if (response.status === 200) {
      handleClose();
      setUserData(userDataCopy);
    }
  }

  return (
    <>
      <div className="container">
        {userData.firstName ? (
          <>
            <div className="row">
              <h1>Profile</h1>
            </div>
            <div className="row">
              <h2>Personal Information</h2>
            </div>
            <div className="row">
              <p>First Name: {userData.firstName}</p>
            </div>
            <div className="row">
              <p>Last Name: {userData.lastName}</p>
            </div>
            <div className="row">
              <p>Email: {userData.email}</p>
            </div>
            <div className="row">
              <p>Phone: {userData.phone}</p>
            </div>
            <div className="row">
              <p>Role: {userData.role.name}</p>
            </div>
            <div className="row">
              <Button variant="primary" onClick={handleShow}>
                Edit Profile
              </Button>
            </div>
            <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your first name"
                      onChange={handleModal}
                    value={userDataCopy.firstName}
                      name="firstName"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your last name"
                      onChange={handleModal}
                      name="lastName"
                        value={userDataCopy.lastName}                    
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={userDataCopy.email}
                      onChange={handleModal}

                      name="email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your phone Number"
                      onChange={handleModal}
                      value={userDataCopy.phone}
                      name="phone"
                    />
                  </Form.Group>

                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleEdit}>Save Changes</Button>
              </Modal.Footer>
            </Modal>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};
