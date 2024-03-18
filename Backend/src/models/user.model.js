import mongoose, { Schema } from "mongoose";
import AuthRoles from "../utils/authRoles.js";
import bcrypt from "bcryptjs";
import config from "../config/index.config.js";
const userSchema = new Schema(
  {
    username: {
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
    password: {
      type: String,
      required: [true, "Password is required"],
      unique: true,
      trim: true,
      mixLength: [8, "Password must be at least 8 characters"],
      select: false, // by default it will not give you we have to use extra field
    },

    fullName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      index: true,
    },
    role: {
      type: String,
      enum: Object.values(AuthRoles),
      default: AuthRoles.USER,
    },
    image: {
      type: String,
    },

    // forgot password functionality
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  { timestamps: true }
);

// mongoose Hooks
// encrypt the password before saving

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods = {
  // compare pass
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },

  // GENERATING JWT TOKEN
  getJWTtoken: function () {
    JWT.sign({ _id: this._id, role: this.role }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRY,
    });
  },
};

export const User = mongoose.model("User", userSchema);
