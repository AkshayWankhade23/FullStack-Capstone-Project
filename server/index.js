const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv");
dotenv.config();


const app = express();

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use("/", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "All Good!!",
    time: new Date(),
  });
});

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
      console.log("server running on http://localhost:${process.env.PORT}")
    )
    .catch((error) => console.log(error));
});
