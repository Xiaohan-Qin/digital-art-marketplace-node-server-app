import * as reviewDao from "./review-dao.js";

const createReview = async (req, res) => {
  const newReview = req.body;
  const insertedReview = await reviewDao.createReview(newReview);
  res.json(insertedReview);
};

const getReviews = async (req, res) => {
  const contractAddress = req.params.contractAddress;
  const tokenId = req.params.tokenId;
  const reviews = await reviewDao.findReviewsByCredentials(contractAddress, tokenId);
  res.json(reviews);
};

export default (app) => {
  app.get("/api/review/:contractAddress/:tokenId", getReviews);
  app.post("/api/review/:contractAddress/:tokenId", createReview);
};
