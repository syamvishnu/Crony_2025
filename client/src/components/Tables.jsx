import DataTable from "react-data-table-component";
import { Loader, Input, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
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

  console.log(data.data.data1);

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
      name: "Email",
      selector: (row) => row.email,
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
    setFilteredData(newData);
  };

  const handleFilter1 = (e) => {
    const newData = getData.filter((row) => {
      return row.localaddress
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setFilteredData(newData);
  };

  if (data) {
    var sdrData = data.data.data1;
  }

  const exportToExcel = () => {
    if (!sdrData || (Array.isArray(sdrData) && sdrData.length === 0)) {
      console.error("No data to export.");
      return;
    }

    const formattedData = Array.isArray(sdrData) ? sdrData : [sdrData];

    const transformedData = formattedData.map(({ _id, ...rest }) => ({
      "Phone Number": rest.tnumber,
      Name: rest.subscribername,
      DOB: rest.dob,
      "Father/Hus Name": rest.fatherhusname,
      Address: rest.localaddress,
      "Address Proof": rest.addressproff,
      "Alternate Number": rest.alternative,
      Email: rest.email,
    }));

    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SDR Data");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "SDR_Data.xlsx");
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
            <div style={{ padding: "10px" }}>
              <Input
                style={{ paddingRight: "10px" }}
                placeholder="Name Filter"
                onChange={handleFilter}
              />
              <Input
                style={{ paddingRight: "10px" }}
                focus
                placeholder="Address Filter"
                onChange={handleFilter1}
              />
              <Button icon="upload" onClick={exportToExcel} />
            </div>

            <DataTable
              keyField="_id"
              columns={columns}
              data={filteredData}
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
