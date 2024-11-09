import DataTable from "react-data-table-component";
import { Loader, Input } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "./tables.css";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const customStyles = {
  tableWrapper: {
    style: {
      display: "flex",
      justifyContent: "center",
      border: "1px solid black",
    },
  },
};

function Tables() {
  const navigate = useNavigate();
  const [getData, setGetData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const { data, error, loading, success, message } = useSelector(
    (state) => state.key
  );

  console.log(data);

  const columns = [
    {
      name: "Number",
      selector: (row) => row.tnumber,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.subscribername,
    },
    {
      name: "Address Proof",
      selector: (row) => row.addressproff,
      wrap: true,
    },
    {
      name: "DOB",
      selector: (row) => row.dob,
    },
    {
      name: "Address",
      selector: (row) => row.localaddress,
      wrap: true,
    },
  ];

  useEffect(() => {
    if (data && data.data) {
      setGetData(data.data.data1);
      setFilteredData(data.data.data1);
    }
  }, [data]);

  const handleFilter = (e) => {
    const newData = getData.filter((row) => {
      return row.subscribername
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setFilteredData(newData); // update filteredData instead of getData
  };

  return (
    <div>
      <Navbar />
      <div className="tables">
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Reverse Search
        </h1>

        {loading ? (
          <Loader active inline="centered">
            {" "}
            Loading........
          </Loader>
        ) : (
          <div>
            <Input focus placeholder="Search..." onChange={handleFilter} />
            <DataTable
              keyField="_id"
              columns={columns}
              data={filteredData} // use filteredData instead of getData
              fixedHeader
              pagination
              customStyles={customStyles}
            ></DataTable>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tables;
