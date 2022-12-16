import purchasesModel from "./purchase-model.js";

export const findPurchases = () => purchasesModel.find();

export const findPurchasesByUserId = (userId) => purchasesModel.find({ userId: userId });

export const createPurchase = (purchase) => purchasesModel.create(purchase);
