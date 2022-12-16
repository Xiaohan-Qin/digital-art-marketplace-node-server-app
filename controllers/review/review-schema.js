import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const reviewSchema = mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      tokenId: {
        type: String,
        required: true,
      },
      contractAddress: {
        type: String,
        required: true,
      }
    },
    { collection: "reviews" }
);

export default reviewSchema;