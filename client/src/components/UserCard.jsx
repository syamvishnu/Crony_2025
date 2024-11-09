import React, { useState } from "react";
import {
  CardMeta,
  CardHeader,
  CardGroup,
  CardDescription,
  CardContent,
  Button,
  Card,
  Image,
} from "semantic-ui-react";
import logo from "../img/USER.png";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

function userCard({ onLogout }) {
  const { user } = useSelector((state) => state.user);

  const [redirect, setRedirect] = useState(false);

  const handleAdminRedirect = () => {
    setRedirect(true);
  };

  // Check if redirect is set to true and return <Navigate /> if it is
  if (redirect) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div>
      <CardGroup>
        <Card>
          <CardContent>
            <Image floated="right" size="mini" src={logo} />
            <CardHeader>{user.name}</CardHeader>
            <CardMeta>{user.roll}</CardMeta>
            <CardDescription>
              <h3> Hello {user.name}</h3>
            </CardDescription>
          </CardContent>
          <CardContent extra>
            <div className="ui two buttons">
              {user.roll == "admin" ? (
                <Button basic color="green" onClick={handleAdminRedirect}>
                  Admin Page
                </Button>
              ) : null}
              <Button basic color="red" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </CardGroup>
    </div>
  );
}

export default userCard;
