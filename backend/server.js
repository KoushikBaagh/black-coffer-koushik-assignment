const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const dotenv = require("dotenv");
const dataModel = require("./models/dataModel.js");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // to accept json data

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

// API endpoint to fetch data from MongoDB
app.get("/api/data", async (req, res) => {
  try {
    const data = await dataModel.find();
    res.json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// --------------------------deployment------------------------------//

const __dirname1 = __dirname;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "../frontend/build/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("HEY! API is running..");
  });
}
// --------------------------deployment------------------------------//

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
