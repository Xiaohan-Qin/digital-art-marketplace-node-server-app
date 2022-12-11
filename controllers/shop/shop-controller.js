import axios from "axios";

import caches from "../../cache/collection-cache.js";

const NFTPORT_API_KEY = process.env.NFTPORT_API_KEY;

/**
 * Get 25 NFTs of a certain collection
 * Example client request:
 * /api/shop/0xe8be8b85a2ad7f29de32edbabb87efb109fa5b82/1
 * @param {*} req Client request with the contractAddress and page as a query param
 * @param {*} res Server response containing 25 NFTs
 */
const getShopPage = async (req, res) => {
  const contractAddress = req.params.contractAddress;
  const page = req.params.page;

  // Check if the cache has the data
  if (page * 25 <= caches[contractAddress].length) {
    const startIndex = (page - 1) * 25;
    const endIndex = startIndex + 25;
    res.json(caches[contractAddress].slice(startIndex, endIndex));
    console.log("cache hit");
    return;
  }

  // Else fetch the data from NFTPort
  try {
    const nftArray = await getOneCollection(contractAddress, page);
    res.json(nftArray);
  } catch (err) {
    res.status(503).json({ message: err.message });
  }
};

/**
 * Internal helper function for getShopPage
 * @returns {Array} An array of 25 NFTs
 */
const getOneCollection = async (contractAddress, page) => {
  let response = [];
  try {
    response = await axios.get(`https://api.nftport.xyz/v0/nfts/${contractAddress}`, {
      params: {
        chain: "ethereum",
        include: "metadata",
        page_number: page,
        page_size: 25,
      },
      headers: {
        Authorization: `${NFTPORT_API_KEY}`,
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    throw err;
  }
  // Cache this array
  response.data.nfts.forEach((nft) => {
    caches[contractAddress].push(nft);
  });
  console.log(caches[contractAddress].length);
  return response.data.nfts;
};

export default (app) => {
  app.get("/api/shop/:contractAddress/:page", getShopPage);
};
