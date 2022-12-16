import mongoose from "mongoose";
import reviewSchema from "./review-schema.js";

const reviewModel = mongoose.model("reviewModel", reviewSchema);
export default reviewModel;