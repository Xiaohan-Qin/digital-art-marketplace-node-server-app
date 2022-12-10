import mongoose from "mongoose";
import usersSchema from "./users-schema.js";

const usersModel = mongoose.model("userModel", usersSchema);
export default usersModel;
