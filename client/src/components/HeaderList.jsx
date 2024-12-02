// import React from "react";
// import { useSelector } from "react-redux";
// import {
//   GridColumn,
//   Grid,
//   FormInput,
//   FormGroup,
//   Button,
//   Form,
// } from "semantic-ui-react";
// import Navbar from "./Navbar";

// function HeaderList() {
//   const { data, loading, error } = useSelector((state) => state.db);

//   // Log the data to inspect its structure
//   console.log("Data received from state:", data);

//   if (loading) {
//     return <div>Loading headers...</div>;
//   }

//   if (error) {
//     return <div>Error loading headers.</div>;
//   }

//   // Check if data is an array
//   if (!data || !Array.isArray(data.headers)) {
//     return <div>No headers available.</div>;
//   }

//   return (
//     <div>
//       <Navbar />
//       <div>
//         <Grid columns={5} padded style={{ padding: "60px" }}>
//           {data.headers.map((color, index) => (
//             <GridColumn
//               key={color}
//               style={{
//                 border: "1px solid black", // Add a border
//                 padding: "10px", // Adjust padding for spacing
//                 textAlign: "center", // Center-align text
//                 display: "flex", // Flexbox for centering content
//                 flexDirection: "column", // Stack number and color vertically
//                 justifyContent: "center", // Center vertically
//                 alignItems: "center", // Center horizontally
//               }}
//             >
//               <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                 {index + 1}. {/* Display the numbering */}
//               </div>
//               <div>{color}</div> {/* Display the data item */}
//             </GridColumn>
//           ))}
//         </Grid>
//       </div>
//       <div style={{ padding: "40px", marginTop: "-30px" }}>
//         <Form>
//           <FormGroup unstackable widths={2}>
//             <FormInput
//               label="Phone Number"
//               placeholder="Phone Number"
//               type="number"
//             />
//             <FormInput
//               label="Subscriber Name"
//               placeholder="Subscriber Name"
//               type="number"
//             />
//             <FormInput label="DOB" placeholder="DOB" type="number" />
//             <FormInput
//               label="Father Name"
//               placeholder="Father Name"
//               type="number"
//             />
//             <FormInput
//               label="Local Address"
//               placeholder="Local Address"
//               type="number"
//             />
//             <FormInput
//               label="Permanent Address"
//               placeholder="Permanent Address"
//               type="number"
//             />
//             <FormInput label="ID Proof" placeholder="ID Proof" type="number" />
//             <FormInput
//               label="Service Provider"
//               placeholder="Service Provider"
//               type="number"
//             />
//             <FormInput label="Alt No" placeholder="Alt No" type="number" />
//             <FormInput label="Email" placeholder="Email" type="number" />
//           </FormGroup>
//           <Button type="submit">Submit</Button>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default HeaderList;

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   GridColumn,
//   Grid,
//   FormInput,
//   FormGroup,
//   Button,
//   Form,
// } from "semantic-ui-react";
// import Navbar from "./Navbar";

// function HeaderList() {
//   const { data, loading, error } = useSelector((state) => state.db);

//   // States for input and matched headers
//   const [inputNumbers, setInputNumbers] = useState("");
//   const [selectedHeaders, setSelectedHeaders] = useState([]);

//   // Log the data to inspect its structure
//   console.log("Data received from state:", data);

//   if (loading) {
//     return <div>Loading headers...</div>;
//   }

//   if (error) {
//     return <div>Error loading headers.</div>;
//   }

//   // Check if data is an array
//   if (!data || !Array.isArray(data.headers)) {
//     return <div>No headers available.</div>;
//   }

//   // Handle input change
//   const handleInputChange = (e) => {
//     setInputNumbers(e.target.value); // Update input state
//   };

//   // Handle form submission
//   const handleSubmit = () => {
//     // Parse inputNumbers into an array of indices
//     const indices = inputNumbers
//       .split(",")
//       .map((num) => parseInt(num.trim(), 10))
//       .filter((num) => !isNaN(num) && num >= 1 && num <= data.headers.length); // Ensure valid indices

//     // Get the corresponding headers
//     const selected = indices.map((index) => data.headers[index - 1]); // Adjust for 1-based indices
//     setSelectedHeaders(selected);

//     // Log the selected headers
//     console.log("Selected Headers:", selected);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div>
//         <Grid columns={5} padded style={{ padding: "60px" }}>
//           {data.headers.map((header, index) => (
//             <GridColumn
//               key={header}
//               style={{
//                 border: "1px solid black",
//                 padding: "10px",
//                 textAlign: "center",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                 {index + 1}.
//               </div>
//               <div>{header}</div>
//             </GridColumn>
//           ))}
//         </Grid>
//       </div>
//       <div style={{ padding: "40px", marginTop: "-30px" }}>
//         <Form>
//           <FormGroup unstackable widths={2}>
//             <FormInput
//               label="Enter Numbers"
//               placeholder="Enter indices separated by commas (e.g., 1,2,3)"
//               value={inputNumbers}
//               onChange={handleInputChange}
//             />
//           </FormGroup>
//           <Button type="button" onClick={handleSubmit}>
//             Submit
//           </Button>
//         </Form>
//       </div>
//       <div style={{ padding: "40px" }}>
//         <h3>Selected Headers:</h3>
//         {selectedHeaders.length > 0 ? (
//           <ul>
//             {selectedHeaders.map((header, index) => (
//               <li key={index}>{header}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No headers selected.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default HeaderList;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../img/loading1.png";
import logo1 from "../img/progress.png";

import {
  GridColumn,
  Grid,
  Button,
  Form,
  Dimmer,
  Loader,
  Image,
  Segment,
} from "semantic-ui-react";
import Navbar from "./Navbar";
import { uploadData } from "../features/dbUpdateSlice";
import { useLocation } from "react-router-dom";

function HeaderList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data1 } = location.state || {};

  const { data, isLoading, error, isSuccess } = useSelector(
    (state) => state.db
  );

  const [userInputs, setUserInputs] = useState({});
  if (isLoading) {
    return (
      <Segment
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {/* Rotating image */}
        <img
          src={logo}
          alt="Loading..."
          style={{
            width: "100px",
            height: "100px",
            animation: "spin 5s linear infinite",
          }}
        />
        {/* Keyframe animation defined as a <style> block */}
        <style>
          {`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
        <h1>Loading..... </h1>
      </Segment>
    );
  }
  if (error) {
    return <div>Error loading headers.</div>;
  }

  if (!data || !Array.isArray(data.headers)) {
    return <div>No headers available.</div>;
  }

  const handleInputChange = (field, value) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const results = Object.entries(userInputs).reduce((acc, [field, value]) => {
      const index = parseInt(value.trim(), 10);
      if (!isNaN(index) && index >= 1 && index <= data.headers.length) {
        acc[field] = data.headers[index - 1];
      } else {
        acc[field] = "Invalid index";
      }
      return acc;
    }, {});
    const datas = {
      results,
      selectedFile: data1,
    };

    dispatch(uploadData(datas));
    console.log("Selected Headers for each field:", results);
  };

  return (
    <div>
      <Navbar />
      <div>
        <Grid columns={5} padded style={{ padding: "60px" }}>
          {data.headers.map((header, index) => (
            <GridColumn
              key={header}
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                {index + 1}.
              </div>
              <div>{header}</div>
            </GridColumn>
          ))}
        </Grid>
      </div>

      <div style={{ padding: "40px" }}>
        <h3>User Information:</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
          }}
        >
          {[
            "tnumber",
            "subscribername",
            "dob",
            "fatherhusname",
            "localaddress",
            "permanantaddress",
            "addressproff",
            "service_provider",
            "alternative",
            "email",
          ].map((label, index) => (
            <div key={index}>
              <p>
                <strong>{label}:</strong>
              </p>
              <input
                type="number"
                placeholder={`Enter number for ${label}`}
                onChange={(e) => handleInputChange(label, e.target.value)}
                style={{ width: "100%", padding: "5px" }}
              />
            </div>
          ))}
        </div>
        <Form style={{ marginTop: "20px" }}>
          <Button type="button" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default HeaderList;
