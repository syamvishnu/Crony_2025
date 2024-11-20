import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  CardMeta,
  CardHeader,
  CardGroup,
  CardDescription,
  CardContent,
  Card,
  HeaderContent,
  Header,
  Icon,
  Button,
  ModalContent,
  ModalActions,
  Modal,
} from "semantic-ui-react";

function SidebarCard() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // Track errors
  const [selectedUserId, setSelectedUserId] = useState(null); // Track selected user ID

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
          throw new Error("No token found. Please log in.");
        }

        const reqs = await axios.get(
          "http://localhost:5000/api/admin/getuser",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        // Set the state with the nested array
        if (Array.isArray(reqs.data.users)) {
          setUsers(reqs.data.users);
        } else {
          console.error("Expected an array, received:", reqs.data);
          setUsers([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
        setError(error.message);
      }
    };

    getUser();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.token) {
        throw new Error("No token found. Please log in.");
      }

      // Make a DELETE request with the user's token and ID
      await axios.delete(`http://localhost:5000/api/admin/deluser/${userId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      // Filter out the deleted user from the state
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      console.log("User deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data?.message || error.message
      );
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <div>
        <Header as="h2" icon textAlign="center">
          <Icon name="users" circular />
          <HeaderContent>User Accounts</HeaderContent>
        </Header>
      </div>
      {error ? (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      ) : (
        <CardGroup>
          {users.map((val, index) => (
            <Card key={index}>
              <CardContent>
                <CardHeader>{val.name || "Unnamed User"}</CardHeader>
                <CardMeta>{val.roll || "Role not specified"}</CardMeta>
                <CardDescription>{`Pen Number - ${val.penno}`}</CardDescription>
              </CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <Modal
                  closeIcon
                  open={open}
                  onClose={() => setOpen(false)}
                  onOpen={() => {
                    setSelectedUserId(val._id);
                    setOpen(true);
                  }}
                  trigger={<Button color="google plus">Delete</Button>}
                >
                  <Header icon="archive" content="Delete User" />
                  <ModalContent>
                    <p>Are you sure you want to delete this user?</p>
                  </ModalContent>
                  <ModalActions>
                    <Button color="red" onClick={() => setOpen(false)}>
                      <Icon name="remove" /> No
                    </Button>
                    <Button
                      color="green"
                      onClick={() => {
                        handleDelete(selectedUserId);
                        setOpen(false);
                      }}
                    >
                      <Icon name="checkmark" /> Yes
                    </Button>
                  </ModalActions>
                </Modal>
              </div>
            </Card>
          ))}
        </CardGroup>
      )}
    </div>
  );
}

export default SidebarCard;
