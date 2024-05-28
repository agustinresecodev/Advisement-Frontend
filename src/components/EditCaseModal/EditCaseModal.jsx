import { Modal } from "react-bootstrap";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getUserData } from "../Slicers/userSlicer";

export const EditCaseModal = ({
  showEdit,
  handleEditClose,
  handleSeeEdit,
  caseData,
  handleEditModal,
  editCase,
  clientFilter,
  techFilter,
  filteredClients,
  filteredTechs,
  handlerClientChange,
  handlerTechChange,
}) => {
  const userData = useSelector(getUserData);
  console.log(userData);
  return (
    <Modal
      size="lg"
      show={showEdit}
      onHide={handleSeeEdit}
      backdrop="static"
      keyboard={false}
      key={caseData.id + "EditModal"}
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
              {userData.decodificado.userRole === "technicians" ? (
                <p>{caseData.description}</p>
              ) : (
                <>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    onChange={handleEditModal}
                    name="description"
                    value={caseData.description}
                  />
                </>
              )}
            </InputGroup>
          </div>
          <p>Status</p>
          <Form.Select
            aria-label="Status"
            onChange={handleEditModal}
            name="status"
          >
            <option>Open this select menu</option>
            <option value="true">Completed</option>
            <option value="false">Pending</option>
          </Form.Select>

          {userData.decodificado.userRole === "technicians" ? (
            <>
              <h5>Client</h5>
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
                  Tech Name: {caseData.user?.firstName}{" "}
                  {caseData.user?.lastName}
                </p>

                <p>Tech Email: {caseData.user?.email}</p>
                <p>Tech Phone: {caseData.user?.phone}</p>
              </div>
              <div>
                <h3>initialDate</h3>
                <input
                  type="date"
                  onChange={handleEditModal}
                  name="initialDate"
                  value={caseData.initialDate}
                />

                <h3>finalDate</h3>
                <input
                  type="date"
                  onChange={handleEditModal}
                  name="finalDate"
                  value={caseData.finalDate}
                />
              </div>
            </>
          ) : (
            <>
          <div>
            <h5>Client</h5>
          <input type="text" onChange={clientFilter} name="name" />
          <select name="client.id" onChange={handlerClientChange}>
            {filteredClients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
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
          <input type="text" onChange={techFilter} name="name" />
          <select name="user.id" onChange={handlerTechChange}>
            {filteredTechs.map((tech) => (
              <option key={tech.id} value={tech.id}>
                {tech.firstName} {tech.lastName}
              </option>
            ))}
          </select>
          <p>
            Tech Name: {caseData.user?.firstName} {caseData.user?.lastName}
          </p>

          <p>Tech Email: {caseData.user?.email}</p>
          <p>Tech Phone: {caseData.user?.phone}</p>
        </div>
        <div>
          <h3>initialDate</h3>
          <input
            type="date"
            onChange={handleEditModal}
            name="initialDate"
            value={caseData.initialDate}
          />

          <h3>finalDate</h3>
          <input
            type="date"
            onChange={handleEditModal}
            name="finalDate"
            value={caseData.finalDate}
          />
        </div>
            </>
          )}
          
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEditClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => editCase(caseData.id)}>
          Edit Case
        </Button>
      </Modal.Footer>
    </Modal>
  );
};