import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import UsersController from "./controllers/users/users-controller.js";
import CollectionController from "./controllers/collection/collection-controller.js";
import ShopController from "./controllers/shop/shop-controller.js";
import ProductController from "./controllers/product/product-controller.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

try {
  mongoose.connect(CONNECTION_STRING);
  console.log("Database connection successful!");
} catch (error) {
  console.log("Database connection error: " + error);
}

const app = express();
app.use(cors());
app.use(express.json());

UsersController(app);
CollectionController(app);
ShopController(app);
ProductController(app);

app.listen(process.env.PORT || 4000, () => {
  console.log("Listening on port " + (process.env.PORT || 4000));
});
