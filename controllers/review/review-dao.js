import reviewModel from "./review-model.js";

export const findReviewsByCredentials = (contractAddress, tokenId) =>
    reviewModel.find({contractAddress: contractAddress, tokenId: tokenId}, {contractAddress: false, tokenId: false});

export const createReview = (review) => reviewModel.create(review);