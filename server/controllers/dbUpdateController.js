// // import dbUpdateModel from "../model/dbUpdateModel.js";
// // import fs from "fs/promises";

// // const inputFile = "./Sample/AIRTEL_APR2024_Postpaid.txt";

// // const dbUpdate = async (req, res, next) => {
// //   try {
// //     const { selectedCol, newColName } = req.body;
// //     console.log(req.body);

// //     // Try to read the file and handle potential errors
// //     const data = await fs.readFile(inputFile, "utf8");
// //     const lines = data.split("\n");

// //     // Extract headers from the first line
// //     const headers = lines[0].split("|");

// //     // Get the indices of selected columns
// //     const selectedIndices = headers.reduce((acc, header, index) => {
// //       if (selectedCol.includes(header)) {
// //         acc.push(index);
// //       }
// //       return acc;
// //     }, []);

// //     // Remove header line from data
// //     lines.shift();

// //     // Convert each data line to an array of selected values
// //     const documents = lines.map((line) => {
// //       const values = line.split("|");
// //       const document = {};

// //       // Check if selectedIndices is empty
// //       if (selectedIndices.length === 0) {
// //         console.error("No selected indices found!");
// //         return null;
// //       }

// //       selectedIndices.forEach((index) => {
// //         if (values[index] !== undefined) {
// //           document[newColName[index]] = values[index];
// //         } else {
// //           console.warn(`Value at index ${index} is undefined. Skipping.`);
// //         }
// //       });

// //       return document;
// //     });

// //     // Filter out null documents
// //     const validDocuments = documents.filter((doc) => doc !== null);

// //     // Insert data into MongoDB using dbUpdateModel
// //     await dbUpdateModel.insertMany(validDocuments);

// //     res.json({ message: "Data successfully inserted into MongoDB!" });
// //   } catch (error) {
// //     console.error("Error processing data:", error);
// //     if (error.code === "ENOENT") {
// //       res.status(500).json({ message: `File not found: ${inputFile}` });
// //     } else {
// //       res.status(500).json({ message: "Error processing data!" });
// //     }
// //   }
// // };

// // export { dbUpdate };

// // import dbUpdateModel from "../model/dbUpdateModel.js";
// // import { promises as fs } from "fs";
// // import readline from "readline";

// // const dbUpdate = async (req, res, next) => {
// //   try {
// //     const { results, selectedFile } = req.body;
// //     console.log(req.body);

// //     const selectedCol = Object.values(results);
// //     const newColName = Object.keys(results);
// //     console.log(selectedCol);
// //     console.log(newColName);

// //     // Read the file content
// //     const data = await fs.readFile(
// //       `C:\\Users\\ECHO PC\\Desktop\\crony 2025\\Crony_2025\\server\\controllers\\${selectedFile.fileName}`,
// //       "utf8"
// //     );
// //     const lines = data.split("\n");

// //     // Extract headers from the first line
// //     const headers = lines[0].split("|");

// //     // Map selected columns and new names
// //     const selectedMap = selectedCol.reduce((acc, header) => {
// //       const index = headers.indexOf(header);
// //       if (index !== -1) {
// //         acc[header] = newColName[selectedCol.indexOf(header)];
// //       }
// //       return acc;
// //     }, {});

// //     // Remove header line from data
// //     lines.shift();

// //     // Convert each data line to an array of selected values
// //     const documents = lines.map((line) => {
// //       const values = line.split("|");
// //       const document = {};

// //       // Iterate over headers and populate document
// //       headers.forEach((header, index) => {
// //         if (selectedMap[header]) {
// //           document[selectedMap[header]] = values[index] || ""; // Add empty string for missing values
// //         }
// //       });

// //       return document;
// //     });

// //     // Filter out null documents (optional)
// //     const validDocuments = documents.filter(
// //       (doc) => Object.keys(doc).length > 0
// //     );

// //     // Insert data into MongoDB using dbUpdateModel
// //     await dbUpdateModel.insertMany(validDocuments);

// //     res.json({ message: "Data successfully inserted into MongoDB!" });
// //   } catch (error) {
// //     console.error("Error processing data:", error);
// //     if (error.code === "ENOENT") {
// //       res.status(500).json({ message: "File not found" });
// //     } else {
// //       res.status(500).json({ message: "Error processing data!" });
// //     }
// //   }
// // };

// // export { dbUpdate };

// import dbUpdateModel from "../model/dbUpdateModel.js";
// import fs from "fs";
// import readline from "readline";

// const dbUpdate = async (req, res, next) => {
//   try {
//     const { results, selectedFile } = req.body;

//     if (!results || !selectedFile || !selectedFile.fileName) {
//       return res.status(400).json({ message: "Invalid request data." });
//     }

//     console.log("Request Body:", req.body);

//     const selectedColumns = Object.values(results); // Columns to be selected
//     const newColumnNames = Object.keys(results); // New names for the selected columns

//     const filePath = `./controllers/${selectedFile.fileName}`;

//     // Open the file as a read stream
//     const fileStream = fs.createReadStream(filePath, { encoding: "utf8" });
//     const lineReader = readline.createInterface({
//       input: fileStream,
//       crlfDelay: Infinity,
//     });

//     let headers;
//     const batchSize = 1000; // Number of documents per batch
//     let batch = [];

//     // Process the file line by line
//     for await (const line of lineReader) {
//       if (!headers) {
//         // First line contains headers
//         headers = line.split("|");
//         console.log("File Headers:", headers);
//         continue;
//       }

//       const values = line.split("|");
//       const document = {};

//       // Populate the document with selected columns
//       selectedColumns.forEach((column, index) => {
//         const headerIndex = headers.indexOf(column);
//         if (headerIndex !== -1 && values[headerIndex] !== undefined) {
//           const newColumnName = newColumnNames[index];
//           document[newColumnName] = values[headerIndex] || ""; // Map to new name and default to empty string
//           console.log(
//             `Mapped ${column} to ${newColumnName}: ${values[headerIndex]}`
//           ); // Log the mapping
//         } else {
//           console.log(
//             `Column ${column} not found in headers or value is undefined.`
//           );
//         }
//       });

//       // Add a timestamp
//       document.timestamp = new Date().toISOString();
//       console.log("Document:", document); // Log the document

//       if (Object.keys(document).length > 1) {
//         // Ensure there's more than just the timestamp
//         batch.push(document);
//       }

//       // Insert documents in batches
//       if (batch.length === batchSize) {
//         await dbUpdateModel.insertMany(batch); // Insert batch into MongoDB
//         batch = []; // Reset batch
//       }
//     }

//     // Insert any remaining documents
//     if (batch.length > 0) {
//       await dbUpdateModel.insertMany(batch);
//     }

//     res.json({ message: "Data successfully inserted into MongoDB!" });
//   } catch (error) {
//     console.error("Error processing data:", error);

//     if (error.code === "ENOENT") {
//       res.status(404).json({ message: "File not found." });
//     } else if (error.code === "ERR_FS_FILE_TOO_LARGE") {
//       res.status(413).json({ message: "File is too large to process." });
//     } else {
//       res.status(500).json({ message: "Error processing data!" });
//     }
//   }
// };

// export { dbUpdate };

import dbUpdateModel from "../model/dbUpdateModel.js";
import fs from "fs";
import readline from "readline";

const dbUpdate = async (req, res, next) => {
  try {
    const { results, selectedFile } = req.body;
    const isEmpty = (value) => {
      return (
        value == null || // Check for null or undefined
        (typeof value === "object" && Object.keys(value).length === 0) || // Check for empty objects
        (Array.isArray(value) && value.length === 0) // Check for empty arrays
      );
    };

    if (isEmpty(results)) {
      return res.status(400).json({ message: "No Input Found!" }); // Use 400 for client-side errors
    }

    // Validate request data
    if (!results || !selectedFile || !selectedFile.fileName) {
      return res.status(400).json({ message: "Invalid request data." });
    }

    console.log("Processing file:", selectedFile.fileName);

    const selectedColumns = Object.values(results); // Columns to be selected
    const newColumnNames = Object.keys(results); // New names for the selected columns
    const filePath = `./controllers/SDR_Files_Upload/${selectedFile.fileName}`;
    console.log(filePath);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found." });
    }

    // Open the file as a read stream
    const fileStream = fs.createReadStream(filePath, { encoding: "utf8" });
    const lineReader = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let headers;
    const batchSize = 1000; // Number of documents per batch
    let batch = [];
    let lineCount = 0;

    // Process the file line by line
    for await (const line of lineReader) {
      lineCount++;
      if (lineCount === 1) {
        // First line contains headers
        headers = line.split("|");
        console.log("File Headers:", headers);
        continue;
      }

      const values = line.split("|");
      const document = {};

      // Populate the document with selected columns
      selectedColumns.forEach((column, index) => {
        const headerIndex = headers.indexOf(column);
        if (headerIndex !== -1 && values[headerIndex] !== undefined) {
          const newColumnName = newColumnNames[index];
          document[newColumnName] = values[headerIndex].trim() || ""; // Trim and default to empty string
        }
      });

      // Add a timestamp
      document.timestamp = new Date().toISOString();

      if (Object.keys(document).length > 1) {
        // Ensure there's more than just the timestamp
        batch.push(document);
      }

      // Insert documents in batches
      if (batch.length === batchSize) {
        try {
          await dbUpdateModel.insertMany(batch); // Insert batch into MongoDB
        } catch (dbError) {
          console.error("Error inserting batch into MongoDB:", dbError);
        }
        batch = []; // Reset batch
      }
    }

    // Insert any remaining documents
    if (batch.length > 0) {
      try {
        await dbUpdateModel.insertMany(batch);
        console.log(`Inserted remaining ${batch.length} documents.`);
      } catch (dbError) {
        console.error("Error inserting final batch into MongoDB:", dbError);
      }
    }

    console.log(`Processed ${lineCount} lines.`);
    res.json({ message: "Data successfully inserted into MongoDB!" });
  } catch (error) {
    console.error("Error processing data:", error);

    if (error.code === "ENOENT") {
      res.status(404).json({ message: "File not found." });
    } else if (error.code === "ERR_FS_FILE_TOO_LARGE") {
      res.status(413).json({ message: "File is too large to process." });
    } else {
      res.status(500).json({ message: "Error processing data!" });
    }
  }
};

export { dbUpdate };
