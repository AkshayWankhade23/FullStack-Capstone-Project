const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Job = require("../models/jobModel");



const test = (req, res) => {
  res.json("test is working");
};

// Error handler middleware
const errorHandler = (res, error) => {
  console.log(error);
  res.status(500).json({ error: "Internal Server Error" });
};

const registerUser = async (req, res) => {
  try {

    //check if name was entered
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    if (mobile.length !== 10) {
      return res.status(400).json({
        error: "Mobile number is required and should contain 10 digits",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password should be at least 6 characters long",
      });
    }


    const hashedPassword = await hashPassword(password);
    //create user in database
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    errorHandler(res, error);
  }
};

//Login Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if email and password are provided
    if(!email || !password) {
      return res.status(400).json({ error: 'Email and Password are required' });
    }

    // check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "No user found",
      });
    }

    //check if password match
    const match = await comparePassword(password, user.password);
    if (match) {
      // Generate JWT token
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
          name: user.name,
        },
        process.env.JWT_SECRET_KEY
      );

      // Set the token in the response cookie
      res.cookie('token', token);

      // Return Success response
      return res.json({ success: true, recruiterName: user.name, user: email });
    } else {
      return res.status(401).json({
        error: 'Password does not match',
      });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

// For Job Schema
const jobUser = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, user) => {
      if (err) {
        res.status(401).json({
          status: "Error",
          message: "Token verification failed",
        });
        return;
      }

      try {
        // Create and save the job
        const job = await Job.create(req.body);
        await job.save();

        res.status(201).json({
          status: "Success",
          data: job,
        });
      } catch (error) {
        res.status(400).json({
          status: "Error",
          message: error.message,
        });
      }
    });
  } else {
    res.status(401).json({
      status: "Error",
      message: "Token not provided",
    });
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, (err, user) => {
      if (err) {
        return res.status(401).json({
          error: "Token verification failed",
        });
      }

      res.json(user);
    });
  } else {
    res.json(null);
  }
};


module.exports = {
  test,
  registerUser,
  loginUser,
  jobUser,
  getProfile,
};