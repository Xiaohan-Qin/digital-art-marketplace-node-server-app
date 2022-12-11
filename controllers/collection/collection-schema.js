import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const collectionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contractAddress: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail_url: {
      type: String,
      required: true,
    },
  },
  { collection: "collections" }
);

export default collectionSchema;
