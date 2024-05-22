const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

mongoose.connect(process.env.MongoDB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log("failed to connect to the database", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
