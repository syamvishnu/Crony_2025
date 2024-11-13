import React from "react";
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
