import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import "./DbUpload.css";
import { Button, Input, Container } from "semantic-ui-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { headerRead } from "../features/headerReadSlice.js";

function DbUpdate() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [headerData, setHeaderData] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useSelector((state) => state.db);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    setSelectedFile(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data1 = {
      fileName: selectedFile,
    };
    dispatch(headerRead(data1));
    navigate("/header", { state: { data1 } });
  };

  return (
    <div>
      <Navbar />
      <div className="search">
        <Container text>
          <div>
            <Input
              type="file"
              placeholder="Search..."
              onChange={handleFileChange}
            >
              <input />
              <Button color="instagram" onClick={handleSubmit}>
                Search
              </Button>
            </Input>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default DbUpdate;
