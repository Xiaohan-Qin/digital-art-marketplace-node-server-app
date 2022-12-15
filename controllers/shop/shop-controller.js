import axios from "axios";

import * as collectionDao from "../collection/collection-dao.js";

const NFTPORT_API_KEY = process.env.NFTPORT_API_KEY;

/**
 * Get 20 NFTs of a certain collection
 * Example client request:
 * /api/shop/azuki
 */
const getShop = async (req, res) => {
  const encodedName = req.params.encodedName;

  // Find the matching collection in the database
  let contractAddress = "";
  try {
    const collection = await collectionDao.findOneCollection(encodedName);
    if (collection) {
      contractAddress = collection.contractAddress;
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(503).json({ message: err.message });
  }

  // Fetch the data from NFTPort
  try {
    const response = await axios.get(`https://api.nftport.xyz/v0/nfts/${contractAddress}`, {
      params: {
        chain: "ethereum",
        include: "metadata",
        page_number: 1,
        page_size: 20,
      },
      headers: {
        Authorization: `${NFTPORT_API_KEY}`,
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    });
    res.json(
      response.data.nfts
        .filter((nft) => nft.metadata) // some metadata may be null
        .map((nft) => ({
          name: nft.metadata.name,
          tokenId: nft.token_id,
          contractAddress: contractAddress,
          chain: "Ethereum",
          tokenStandard: "ERC-721",
          description: nft.metadata.description,
          image: nft.cached_file_url,
        }))
    );
  } catch (err) {
    res.status(err.response.status).json({ message: err.message });
    return;
  }
};

export default (app) => {
  app.get("/api/shop/:encodedName", getShop);
};
