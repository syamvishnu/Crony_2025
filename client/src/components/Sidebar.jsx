import React, { useState } from "react";
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
import UserLogTable from "./UserLogTable";
import UserLogToAdmin from "../pages/UserLogToAdmin";

function Sidebars() {
  const [selectPage, setSelectpage] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logOutUser());
    dispatch(reset());
    navigate("/");
  };

  const onDash = () => {
    dispatch(reset());
    navigate("/home");
  };
  const onLog = () => {
    dispatch(reset());
    setSelectpage(false);
  };

  const onUserList = () => {
    dispatch(reset());
    setSelectpage(true);
  };

  const onDb = () => {
    dispatch(reset());
    navigate("/upload");
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

          <Step active onClick={onUserList}>
            <Icon name="user secret" />
            <StepContent>
              <StepTitle>User's List</StepTitle>
            </StepContent>
          </Step>

          <Step active onClick={onLog}>
            <Icon name="globe" />
            <StepContent>
              <StepTitle>User's Logs</StepTitle>
            </StepContent>
          </Step>

          <Step active onClick={onDb}>
            <Icon name="database" />
            <StepContent>
              <StepTitle>DataBase</StepTitle>
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
        {selectPage ? <SidebarCard /> : <UserLogToAdmin />}
      </div>
    </div>
  );
}

export default Sidebars;
