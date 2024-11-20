import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Divider,
  Icon,
  Image,
  Segment,
  CardMeta,
  CardHeader,
  CardGroup,
  CardDescription,
  CardContent,
  Card,
  HeaderContent,
  Header,
} from "semantic-ui-react";
import UserLogTable from "../components/UserLogTable";
import axios from "axios";
const columns1 = [
  {
    name: "Pen Number",
    selector: (row) => row.penno,
    sortable: true,
  },
  {
    name: "Date & Time",
    selector: (row) =>
      new Date(row.timestamp).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // Set to false for 24-hour format
      }),
    sortable: true,
  },
  ,
  {
    name: "Status",
    selector: (row) => row.logState,
    sortable: true,
  },
];

const columns2 = [
  {
    name: "Pen Number",
    selector: (row) => row.penno,
  },
  {
    name: "Date & Time",
    selector: (row) =>
      new Date(row.timestamp).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // Set to false for 24-hour format
      }),
    sortable: true,
  },
  ,
  {
    name: "Data",
    selector: (row) => row.data,
  },
];

function UserLogToAdmin() {
  const [userLog, setUserLog] = useState([]);
  const [searchLog, setSearchLog] = useState([]);

  useEffect(() => {
    const getUserLog = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
          throw new Error("No token found. Please log in.");
        }

        const reqs = await axios.get(
          "http://localhost:5000/api/admin/getuserlog",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setUserLog(reqs.data.userLog);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    getUserLog();
  }, []);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const getSearchLog = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.token) {
          throw new Error("No token found. Please log in.");
        }

        const reqs = await axios.get(
          "http://localhost:5000/api/admin/getsearchlog",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setSearchLog(reqs.data.sdrLog);
      } catch (error) {
        console.error("Error fetching users:", error.message);
        setError(error.message);
      }
    };

    getSearchLog();
  }, []);

  return (
    <div>
      <div>
        <Header as="h2" icon textAlign="center">
          <Icon name="users" circular />
          <HeaderContent>User Activity</HeaderContent>
        </Header>
      </div>
      <div>
        <Segment>
          <UserLogTable
            columns={columns1}
            title="User Login Activity"
            userLog={userLog}
          />
          <Divider section />
          <UserLogTable
            columns={columns2}
            title="User Search Activity"
            userLog={searchLog}
          />
        </Segment>
      </div>
    </div>
  );
}

export default UserLogToAdmin;
