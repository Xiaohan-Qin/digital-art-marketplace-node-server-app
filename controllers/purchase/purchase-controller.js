import mongoose from "mongoose";
import * as purchaseDao from "./purchase-dao.js";

const findPurchases = async (req, res) => {
  const purchases = await purchaseDao.findPurchases();
  res.json(purchases);
};

const findPurchasesByUserId = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.params.userId);
  const purchases = await purchaseDao.findPurchasesByUserId(userId);
  res.json(purchases);
};

const createPurchase = async (req, res) => {
  const purchase = req.body;
  const newPurchase = await purchaseDao.createPurchase(purchase);
  res.json(newPurchase);
};

export default (app) => {
  app.get("/api/purchases", findPurchases);
  app.get("/api/purchases/:userId", findPurchasesByUserId);
  app.post("/api/purchases", createPurchase);
};
