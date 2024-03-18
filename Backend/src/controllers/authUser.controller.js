// signup user
import { User } from "../models/user.model.js";
import CustomError from "../utils/CustomError.js";
import asyncHandler from "../utils/asyncHandler.js";

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

  //validation
  if (!email || !password) {
    throw new CustomError("Please fill all details", 400);
  }

  const user = user.findOne({ email: email}).select("+password") // + for password : select = false
  if(!user) {
    throw new CustomError("Invalid credentials", 400);
  }

  // comparing password
  
  const isPasswordMatched = await user.comparePassword(password);

  if(isPasswordMatched){
    const token = user.getJWTtoken()
    user.password = undefined
    res.cookie("token", token, cookieOptions)
    return res.status(200).json({
        success: true,
        token, 
        user
    })
  }

    throw new CustomError("Password is incorrect", 400)
});

export const logout = asyncHandler(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "Logout successfully "
    })
}) 