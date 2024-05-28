import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { getAllUsers, getUserById } from "../../services/usersCall";
import { useSelector } from "react-redux";
import { getUserData } from "../../components/Slicers/userSlicer";
import { ViewUserDetailsModal } from "../../components/ViewUserDetailsModal/ViewUserDetailsModal";
import { DeleteUserModal } from "../../components/DeleteUserModal/DeleteUserModal";
import { deleteUser } from "../../services/usersCall";

export const Users = () => {
  //get user token
  const userData = useSelector(getUserData);

  // Flag
  const [flag, setFlag] = useState(false);

  // Const for users
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Const for user
  const [user, setUser] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const handleSeeDetailsClose = () => setShowDetails(false);

  // Function to show user details
  const handleSeeDetails = async (id) => {
    const response = await getUserById(id, userData.token);
    setUser(response.data);
    setShowDetails(true);
  };

  // const to show delete modal
  const [showDelete, setShowDelete] = useState(false);

  // Function to open delete modal
  const handleSeeDelete = async (id) => {
    const response = await getUserById(id, userData.token);
    setUser(response.data);
    setShowDelete(true);
  };

  // Function to call users
  useEffect(() => {
    const getUsers = async () => {
      console.log(userData.token);
      const response = await getAllUsers(userData.token);
      setUsers(response.data);
      setFilteredUsers(response.data);
      setFlag(true);
      console.log(response.data);
    };
    if (!flag) {
      getUsers();
    }
  }, [flag]);

  //Headers de la tabla
  const headers = [
    {
      name: "id",
      label: "id",
      selector: (row) => row.id,
    },
    {
      name: "firstName",
      label: "firstName",
      selector: (row) => row.firstName,
    },
    {
      name: "lastName",
      label: "lastName",
      selector: (row) => row.lastName,
    },
    {
      name: "email",
      label: "email",
      selector: (row) => row.email,
    },
    {
      name: "phone",
      label: "phone",
      selector: (row) => row.phone,
    },
    {
      name: "isActive",
      label: "isActive",
      selector: (row) => row.isActive,
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
            className="btn btn-danger"
            onClick={() => handleSeeDelete(row.id)}
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
  // Function to delete user
  const handlerDeleteUser = async () => {
    const response = await deleteUser(user.id, userData.token);
    if (response.status === 200) {
      alert("User deleted");
      setShowDelete(false);
      setFlag(false);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Users</h1>
        <DataTable
          columns={headers}
          data={users}
          pagination
          fixedHeader
          striped
        />
      </div>
      <ViewUserDetailsModal
        user={user}
        showDetails={showDetails}
        handleSeeDetailsClose={handleSeeDetailsClose}
      />

      <DeleteUserModal
        showDelete={showDelete}
        handleSeeDeleteClose={() => setShowDelete(false)}
        handlerDeleteUser={handlerDeleteUser}
      />
    </>
  );
};
