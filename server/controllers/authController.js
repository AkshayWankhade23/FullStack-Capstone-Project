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
    const { name, email, mobile, password } = req.body;

    //check if name was entered
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    //check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is already exist",
      });
    }
    //check mobile number
    if (!mobile) {
      return res.json({
        error: "Mobile number is required and it should contain 10 digits",
      });
    }
    //check if password is correct
    if (!password || password.length < 6) {
      return res.json({
        error: "password is required and should be atleast 6 characters long",
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
      jwt.sign(
        {
          email: user.email,
          id: user._id,
          name: user.name,
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user); // wrong
        }
      );
    }
    if (!match) {
      res.status(401).json({
        error: "Password does not match",
      });
    }

    // Generate JWT token
    // const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);

    // Return Success response
    res.json({ success: true, recruiterName: user.name, user:email });
  } catch (error) {
    errorHandler(res, error);
  }
};

// For Job Schema
const jobUser = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
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
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
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