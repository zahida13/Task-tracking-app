const path = require("path");
const express = require("express");
const connectDB = require("./config/data");
const dotenv = require("dotenv").config();
const cors = require("cors") 
const PORT = process.env.PORT || 5000;
connectDB()
const app = express();   
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoute"));



 
app.listen(PORT, console.log("working port", PORT));