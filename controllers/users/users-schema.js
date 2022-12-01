import mongoose from "mongoose";
import  isEmail  from "validator";

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: [ isEmail, 'invalid email' ]
  },
  userType: {
    type: String,
    enum: ["free", "premium", "admin"],
    default: "free"
  },
  phone: String,
  avatar: String,
  numOfOwnedItem: Number
}, {collection: 'users'});

export default usersSchema;

