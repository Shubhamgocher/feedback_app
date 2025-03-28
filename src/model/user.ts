import mongoose, { Document, Schema } from "mongoose";
import { BlockList } from "net";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}
const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified:boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}
const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Please provide valide email address']
  },
  password: {
    type: String,
    required: [true,'Password is required'],

  },
  verifyCode:{
    type:String,
    required:[true,"verifyCode required"]
  },
  verifyCodeExpiry:{
    type:Date,
    required:[true,"verifyCode expiry required "]
  },
  isVerified:{
    type:Boolean,
    default:false,
    

  },
  isAcceptingMessage:{
    type:Boolean,
    default:true,
  },
  messages:[MessageSchema],
});

const UserModel=mongoose.models?.User as mongoose.Model<User> || mongoose.model<User>("User",UserSchema);
export default UserModel;