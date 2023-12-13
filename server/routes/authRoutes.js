const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  registerUser,
  loginUser,
  jobUser,
  getProfile,
} = require("../controllers/authController");
// const job = require("../models/Job");

//Middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/job", jobUser);
router.get("/profile", getProfile);

module.exports = router;

// const mongoose = require("mongoose");
// const router = mongoose.Router
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// router.post('/register', (req, res) => {
//     try {
//         const { name, email, phone, password} = req.body;
//         res.status(200).json({
//             data: data,
//             token: token
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: 'something went wrong' })
//     }
// });

// router.post('/login', (req, res) => {
//     try {
//         const { email, password } = req.body;
//         res.status(200).json({
//             data: data,
//             token: token
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: 'something went wrong' })
//     }
// })

// module.exports = router
