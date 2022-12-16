import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const purchasesSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    products: [
      {
        contractAddress: {
          type: String,
          required: true,
        },
        tokenId: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { collection: "purchases" }
);

export default purchasesSchema;
