// import dbUpdateModel from "../model/dbUpdateModel.js";
// import { promises as fs } from "fs";
// import readline from "readline";

// const columnsName = async (req, res, next) => {
//   const { fileName } = req.body;
//   const inputFile = `./controllers/${fileName}`;

//   try {
//     await fs.promises.access(inputFile, fs.constants.F_OK);

//     const readStream = fs.createReadStream(inputFile, { encoding: "utf8" });
//     const lineReader = readline.createInterface({ input: readStream });

//     let firstLine = "";

//     for await (const line of lineReader) {
//       firstLine = line;
//       lineReader.close();
//       break;
//     }

//     const headers = firstLine.split("|");

//     return res.json({ headers });
//   } catch (err) {
//     console.error("Error reading file:", err);
//     res.status(500).json({ error: "Failed to process the file." });
//   }
// };

// export { columnsName };

// const columnsName = async (req, res, next) => {
//   const { fileName } = req.body;
//   const inputFile = `./controllers/${fileName}`;

//   try {
//     await fs.promises.access(inputFile, fs.constants.F_OK);

//     const readStream = fs.createReadStream(inputFile, { encoding: "utf8" });
//     const lineReader = readline.createInterface({ input: readStream });

//     let firstLine = "";

//     for await (const line of lineReader) {
//       firstLine = line;
//       lineReader.close();
//       break;
//     }

//     const headers = firstLine.split("|");

//     return res.json({ headers });
//   } catch (err) {
//     console.error("Error reading file:", err);
//     res.status(500).json({ error: "Failed to process the file." });
//   }
// };

import dbUpdateModel from "../model/dbUpdateModel.js";
import fs from "fs"; // Full import for `fs` to use createReadStream
import readline from "readline";

const columnsName = async (req, res) => {
  const { fileName } = req.body;
  const inputFile = `./controllers/SDR_Files_Upload/${fileName}`;

  try {
    // Check if the file exists
    await fs.promises.access(inputFile);

    // Create a readable stream and line reader
    const readStream = fs.createReadStream(inputFile, { encoding: "utf8" });
    const lineReader = readline.createInterface({ input: readStream });

    let firstLine = "";

    // Read the first line from the file
    for await (const line of lineReader) {
      firstLine = line;
      lineReader.close(); // Close the lineReader after the first line
      break;
    }

    // Split the first line into headers
    const headers = firstLine.split("|");

    // Send headers as a JSON response
    return res.json({ headers, fileName });
  } catch (err) {
    console.error("Error reading file:", err.message);

    // Handle specific error codes
    if (err.code === "ENOENT") {
      return res.status(404).json({ error: "File not found." });
    }
    return res.status(500).json({ error: "Failed to process the file." });
  }
};

export { columnsName };
