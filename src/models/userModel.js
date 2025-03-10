import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true ,index: true},
  password: { type: String, required: true }, // Hashed Password
  role: { type: String, enum: ["primary", "secondary"], required: true },
  isVerified:{
    type:Boolean,
    default:false
  },
  forgetPasswordToken: String,
  forgetPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,

  // Primary User Fields (YouTube Account Linking)
  googleId: { type: String, unique: true }, // Google OAuth ID (Only for Primary Users)
  youtubeChannelId: { type: String, unique: true }, // Linked YouTube Channel ID

  // Secondary User Fields (Joining via Token)
  primaryUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Primary user reference
  inviteToken: { type: String, unique: true }, // Token for secondary users to join
  refreshToken :{ type:String }
},{
  timestamps:true
});



userSchema.method.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password,this.password)
}

userSchema.method.generateAccessToken = function(){
  jwt.sign({
    _id : this._id,
    name: this.name,
    email :this.email,
    
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn :ACCESS_TOKEN_EXPIRY
  }
)
}
userSchema.method.generateRefreshToken = function(){
  jwt.sign({
    _id : this._id,
    name: this.name,
    email :this.email,
    
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn :REFRESH_TOKEN_EXPIRY
  }
)
}

const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User;