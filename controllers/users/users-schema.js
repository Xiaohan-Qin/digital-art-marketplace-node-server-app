import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

mongoose.set("strictQuery", true);

const productSchema = mongoose.Schema(
    {
      contractAddress: {
        type: String,
        required: true,
      },
      tokenId: {
        type: String,
        required: true,
      }
    }
);

const usersSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail, "invalid email"],
    },
    userType: {
      type: String,
      enum: ["free", "premium", "admin"],
      default: "free",
    },
    phone: String,
    avatar: String,
    owned: [productSchema],  // mongoose set default as [] automatically
    numOfOwnedItem: Number,
  },
  { collection: "users" }
);

export default usersSchema;
