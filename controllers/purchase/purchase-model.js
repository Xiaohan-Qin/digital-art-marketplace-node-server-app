import mongoose from "mongoose";
import purchasesSchema from "./purchase-schema.js";

const purchasesModel = mongoose.model("purchasesModel", purchasesSchema);
export default purchasesModel;
