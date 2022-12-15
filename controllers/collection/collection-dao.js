import collectionModel from "./collection-model.js";

export const findAllCollections = () => {
  return collectionModel.find();
};

export const findOneCollection = (encodedName) => {
  return collectionModel.findOne({ encodedName: encodedName });
};

export const createCollection = (collection) => {
  return collectionModel.create(collection);
};

export const updateCollection = (contractAddress, collection) => {
  return collectionModel.findOneAndUpdate({ contractAddress: contractAddress }, collection, { new: true });
};

export const deleteCollection = (contractAddress) => {
  return collectionModel.deleteOne({ contractAddress: contractAddress });
};
