import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";

import UsersController from "./controllers/users/users-controller.js";
import CollectionController from "./controllers/collection/collection-controller.js";
import ShopController from "./controllers/shop/shop-controller.js";
import ProductController from "./controllers/product/product-controller.js";
import SessionController from "./controllers/session/session-controller.js";
import ReviewController from "./controllers/review/review-controller.js";
import PurchaseController from "./controllers/purchase/purchase-controller.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

// Check if you're in local development or deployed on Heroku
let origin = "http://localhost:3000";
if (process.env.NODE_ENV === "production") {
  origin = "https://expensive-jpegs.netlify.app";
}

try {
  mongoose.connect(CONNECTION_STRING);
  console.log("Database connection successful!");
} catch (error) {
  console.log("Database connection error: " + error);
}

const app = express();
app.use(
  cors({
    credentials: true,
    origin: origin,
  })
);

// for session management
app.set("trust proxy", 1);
app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.json());

UsersController(app);
CollectionController(app);
ShopController(app);
ProductController(app);
SessionController(app);
ReviewController(app);
PurchaseController(app);

app.get("/", (req, res) => {
  res.send("Welcome to Digital Art Marketplace Remote Server!");
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Listening on port " + (process.env.PORT || 4000));
});
