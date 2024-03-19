// signup user
import { User } from "../models/user.model.js";
import CustomError from "../utils/CustomError.js";
import asyncHandler from "../utils/asyncHandler.js";
import JWT from 'jsonwebtoken'
export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

export const signup = asyncHandler(async (req, res) => {
  // Get data from user
  const { username, password, email } = req.body;

  // Validation
  if (!username || !password || !email) {
    throw new CustomError("Please enter all fields", 400);
  }

  // lets add this data to the database

  //check if user is already exist or not
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError("User already exists", 400);
  }

  // create new user
  const user = await User.create({
    // name: username, email: email,password: password   //-or
    username,
    email,
    password,
  });

  const token = user.getJWTtoken();

  //safety

  user.password = undefined;

  // store this token in user's cookie by sending response
  res.cookie("token", token, cookieOptions);

  // send back a response to the user ....
  res.status(200).json({
    success: true,
    token,
    user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation: Check if email and password are provided
  if (!email || !password) {
    throw new CustomError("Please provide both email and password", 400); // Error message and status code corrected
  }

  // Find the user by email and select the password field (assuming it's hidden by default)
  const user = await User.findOne({ email: email }).select("+password"); // Finding user by email and selecting the password field

  // Check if user exists
  if (!user) {
    throw new CustomError("Invalid credentials", 401); // Error message and status code corrected
  }

  try {
    // Compare the provided password with the stored password
    const isPasswordMatched = await user.comparePassword(password);

    if (isPasswordMatched) {
      // Generate JWT token
      const token = user.getJWTtoken();

      // Remove sensitive data (password) from the user object
      user.password = undefined;

      // Set token in cookie
      res.cookie("token", token, cookieOptions);

      // Send success response
      return res.status(200).json({
        success: true,
        token,
        user,
      });
    } else {
      throw new CustomError("Password is incorrect", 401); // Error message and status code corrected
    }
  } catch (error) {
    console.log(error)
    throw new CustomError("An error occurred during password comparison", 500); // Error message and status code corrected
  }
});


export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logout successfully ",
  });
});

 