const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/userRoute");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3010;

app.get("/healthCheck", (req, res) => {
    console.log(" at the healthcheck api endpoint");
    res.json({
        service: "Quiz app server",
        status: "active",
        time: new Date().getTime(),
    })
})

mongoose.connect(process.env.MongoDB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("failed to connect to the database", error)
  });

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
