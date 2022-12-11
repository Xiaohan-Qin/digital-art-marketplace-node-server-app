import mongoose from "mongoose";
import collectionSchema from "./collection-schema.js";

const collectionModel = mongoose.model("collectionModel", collectionSchema);
export default collectionModel;
