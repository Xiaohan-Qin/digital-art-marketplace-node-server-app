import * as collectionDao from "./collection-dao.js";

/**
 * Create new collection
 */
const createCollection = async (req, res) => {
  const newCollection = req.body;
  try {
    const insertedCollection = await collectionDao.createCollection(newCollection);
    res.send(insertedCollection);
  } catch (err) {
    res.status(503).json({ message: err.message });
  }
};

/**
 * Get all collections
 */
const findAllCollections = async (_req, res) => {
  try {
    const collections = await collectionDao.findAllCollections();
    res.send(collections);
  } catch (err) {
    res.status(503).json({ message: err.message });
  }
};

/**
 * Update one collection by contract address
 */
const updateCollection = async (req, res) => {
  const contractAddress = req.params.contractAddress;
  const updates = req.body;
  try {
    const updatedCollection = await collectionDao.updateCollection(contractAddress, updates);
    if (updatedCollection) {
      res.send(updatedCollection);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(503).json({ message: err.message });
  }
};

/**
 * Delete one collection by contract address
 */
const deleteCollection = async (req, res) => {
  const contractAddress = req.params.contractAddress;
  try {
    const status = await collectionDao.deleteCollection(contractAddress);
    if (status.deletedCount > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(503).json({ message: err.message });
  }
};

export default (app) => {
  app.get("/api/collection", findAllCollections);
  app.post("/api/collection", createCollection);
  app.put("/api/collection/:contractAddress", updateCollection);
  app.delete("/api/collection/:contractAddress", deleteCollection);
};
