import mongoose, { Schema } from 'mongoose';
import AuthRoles from '../utils/authRoles.js'
const userSchema = new Schema( 
    {
        username:{
            type: String,
            required: [true, "userName is required"],
            trim: true,
            index: true,
            lowercase: true,
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            unique: true,

        },
        password:{
            type: String,
            required: [true, "Password is required"],
            unique: true,
            trim: true,
            mixLength: [8, "Password must be at least 8 characters"],
            select: false, // by default it will not give you we have to use extra field
        }, 
     
        fullName:{
            type: String,
            required: [true, "Name is required"],
            trim: true,
            index: true,
        },   
        role: {
            type: String,
            enum: Object.values(AuthRoles),
            default: AuthRoles.USER
        },
        image: {
            type: String
        },

        // forgot password functionality
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,

    }, {timestamps: true})


export const User = mongoose.model('User', userSchema);