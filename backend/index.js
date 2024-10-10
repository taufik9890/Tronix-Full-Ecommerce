require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const router = require("./routes");
const mongoConfig = require("./configs/mongoConfig");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// database config
mongoConfig;

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
