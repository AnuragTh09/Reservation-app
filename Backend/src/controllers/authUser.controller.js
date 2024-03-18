// signup user
import { User } from "../models/user.model.js";
import CustomError from "../utils/CustomError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const signup = asyncHandler(async (req, res) => {
    // Get data from user
    const { username, password, email } = req.body;

    // Validation 
    if (!username || !password || !email) {
     throw new CustomError("Please enter all fields", 400)
    }

   // lets add this data to the database

   //check if user is already exist or not
    const existingUser = await User.findOne({email})
    if(existingUser){
        throw new CustomError("User already exists", 400)
    }

    // create new user 
    const user = await User.create({
        // name: username, email: email,password: password   //-or
        username, email, password
    })


});
