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
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // Track errors
  useEffect(() => {
    const getUser = async () => {
      try {
        // Retrieve the user from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
          throw new Error("No token found. Please log in.");
        }

        // Fetch users from the admin endpoint
        const reqs = await axios.get(
          "http://localhost:5000/api/admin/getuser",
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // Attach the token
            },
          }
        );

        // Update state with the fetched users
        console.log(reqs)
        setUsers(reqs.data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
        setError(error.message); // Update the error state
      }
    };

    getUser();
  }, []);
  

  return (
    <div>
      <div>
        <Header as="h2" icon textAlign="center">
          <Icon name="users" circular />
          <HeaderContent>User Accounts</HeaderContent>
        </Header>
      </div>
      <CardGroup>
        <Card>
          <CardContent>
            <CardHeader>Matthew Harris</CardHeader>
            <CardMeta>Co-Worker</CardMeta>
            <CardDescription>
              Matthew is a pianist living in Nashville.
            </CardDescription>
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
              onOpen={() => setOpen(true)}
              trigger={<Button color="google plus">Show Modal</Button>}
            >
              <Header icon="archive" content="Delete User" />
              <ModalContent>
                <p>Are you sure you want to delete this user?</p>
              </ModalContent>
              <ModalActions>
                <Button color="red" onClick={() => setOpen(false)}>
                  <Icon name="remove" /> No
                </Button>
                <Button color="green" onClick={() => setOpen(false)}>
                  <Icon name="checkmark" /> Yes
                </Button>
              </ModalActions>
            </Modal>
          </div>
        </Card>
      </CardGroup>
    </div>
  );
}

export default SidebarCard;