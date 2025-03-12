import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, index: true },
    password: { type: String, required: true }, // Hashed Password
    role: { type: String, enum: ["primary", "secondary"], required: true },
    isVerified: { type: Boolean, default: false },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    refreshToken: { type: String },

    // Primary User Fields (YouTube Account Linking)
    googleId: { type: String }, // Google OAuth ID (Only for Primary Users)
    youtubeChannelId: { type: String }, // Linked YouTube Channel ID

    // Secondary User Fields (Joining via Token)
    primaryUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Primary user reference
    inviteToken: { type: String }, // Token for secondary users to join
    
  },
  {
    timestamps: true,
  }
);

// Fix for duplicate key error when googleId or youtubeChannelId is null
userSchema.index(
  { googleId: 1 },
  { unique: true, partialFilterExpression: { googleId: { $exists: true, $ne: null } } }
);
userSchema.index(
  { youtubeChannelId: 1 },
  { unique: true, partialFilterExpression: { youtubeChannelId: { $exists: true, $ne: null } } }
);

// Password verification
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Access Token Generator
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Refresh Token Generator
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id, name: this.name, email: this.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

// Export User Model
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
