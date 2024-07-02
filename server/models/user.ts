import mongoose from "mongoose";

interface User {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  isVerifiedEmail: boolean;
  emailToken: string;
  picture: string;
  accessToken: string;
  refreshToken: string;
}

const Schema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    isVerifiedEmail: {
      type: Boolean,
      required: true,
      default: false
    },
    emailToken: {
      type: String,
    },
    picture: {
      type: String,
      required: false,
    },
    accessToken: {
      type: String,
      required: false,
    },
    refreshToken: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
    strict: true,
    strictQuery: true,
  }
);

const User = mongoose.model<User>("User", Schema);

export default User;
