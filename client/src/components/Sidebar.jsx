import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser, reset } from "../features/authSlice";

import {
  HeaderSubheader,
  HeaderContent,
  Header,
  StepTitle,
  StepGroup,
  StepDescription,
  StepContent,
  Icon,
  Step,
} from "semantic-ui-react";
import SidebarCard from "./SidebarCard";

function Sidebars() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logOutUser());
    dispatch(reset());
    navigate("/");
  };

  const onKey = () => {
    dispatch(reset());
    navigate("/keyword");
  };

    const onDash = () => {
      dispatch(reset());
      navigate("/home");
    };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          color: "white",
          padding: "20px",
        }}
      >
        <Header as="h2">
          <Icon name="settings" />
          <HeaderContent style={{ color: "#347C98" }}>
            Admin Panel
          </HeaderContent>
        </Header>

        <StepGroup vertical style={{ gap: "25px" }}>
          <Step active onClick={onDash}>
            <Icon name="home" />
            <StepContent>
              <StepTitle>Dashboard</StepTitle>
            </StepContent>
          </Step>

          <Step active onClick={onKey}>
            <Icon name="sign-out" />
            <StepContent>
              <StepTitle>Keyword</StepTitle>
            </StepContent>
          </Step>

          <Step active>
            <Icon name="user secret" />
            <StepContent>
              <StepTitle>Profile</StepTitle>
            </StepContent>
          </Step>

          <Step active>
            <Icon name="globe" />
            <StepContent>
              <StepTitle>Logs</StepTitle>
            </StepContent>
          </Step>

          <Step active onClick={onLogout}>
            <Icon name="sign-out" />
            <StepContent>
              <StepTitle>Signout</StepTitle>
            </StepContent>
          </Step>
        </StepGroup>
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: "250px",
          padding: "5px",
          flex: 1,
          overflowY: "auto",
        }}
      >
        <SidebarCard />
        
      </div>
    </div>
  );
}

export default Sidebars;
