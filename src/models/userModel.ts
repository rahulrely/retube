import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Interface for User Document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "primary" | "secondary";
  isVerified: boolean;
  forgetPasswordToken?: string;
  forgetPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  refreshToken?: string;

  // Primary User Fields
  googleId?: string;
  youtubeChannelId?: string;

  // Secondary User Fields
  primaryUser?: mongoose.Schema.Types.ObjectId;
  inviteToken?: string;

  // Methods
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

// Define User Schema
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, index: true,
      match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
     },
    password: { type: String, required: true },
    role: { type: String, enum: ["primary", "secondary"], required: true },
    isVerified: { type: Boolean, default: false },
    forgetPasswordToken: { type: String, default: null },
    forgetPasswordTokenExpiry: { type: Date, default: null },
    verifyToken: { type: String, default: null },
    verifyTokenExpiry: { type: Date, default: null },
    refreshToken: { type: String, default: null },

    // Primary User Fields
    googleId: { type: String, default: null },
    youtubeChannelId: { type: String, default: null },

    // Secondary User Fields
    primaryUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    inviteToken: { type: String, default: null },
  },
  { timestamps: true }
);

// Ensure unique indexes for optional fields
userSchema.index(
  { googleId: 1 },
  { unique: true, partialFilterExpression: { googleId: { $exists: true, $ne: null } } }
);
userSchema.index(
  { youtubeChannelId: 1 },
  { unique: true, partialFilterExpression: { youtubeChannelId: { $exists: true, $ne: null } } }
);

// Define Methods
userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    { _id: this._id, email: this.email, role: this.role },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } as jwt.SignOptions
  );
};

userSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY } as jwt.SignOptions
  );
};


// Export User Model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
