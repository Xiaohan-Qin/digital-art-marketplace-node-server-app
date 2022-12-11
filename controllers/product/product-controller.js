import axios from "axios";

import caches from "../../cache/collection-cache.js";

const NFTPORT_API_KEY = process.env.NFTPORT_API_KEY;

/**
 * Example client request:
 * /api/product/0xe8be8b85a2ad7f29de32edbabb87efb109fa5b82/288
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getOneProduct = async (req, res) => {
  const { contractAddress, tokenId } = req.params;

  // Check if the cache has the data
  const result = caches[contractAddress].filter((nft) => {
    return nft.token_id === tokenId;
  });
  if (result.length > 0) {
    res.json(result[0]);
    console.log("cache hit");
    return;
  }

  // Else fetch the data from NFTPort
  try {
    const response = await axios.get(`https://api.nftport.xyz/v0/nfts/${contractAddress}/${tokenId}`, {
      params: {
        chain: "ethereum",
      },
      headers: {
        Authorization: `${NFTPORT_API_KEY}`,
      },
    });
    const nft = response.data.nft;
    res.json({
      name: nft.metadata.name,
      token_id: nft.token_id,
      chain: "Ethereum",
      token_standard: "ERC-721",
      description: nft.metadata.description,
      image: nft.cached_file_url,
      create_date: nft.mint_date,
    });
  } catch (err) {
    res.status(503).json({ message: err.message });
  }
};

/**
 * Example client request:
 * /api/product/tx/0xe8be8b85a2ad7f29de32edbabb87efb109fa5b82/288
 * @param {*} req Client request with the contractAddress and tokenId as query params
 * @param {*} res Server response with the sale history data
 */
const getOneTransaction = async (req, res) => {
  const { contractAddress, tokenId } = req.params;
  let transactions;
  try {
    transactions = await axios.get(`https://api.nftport.xyz/v0/transactions/nfts/${contractAddress}/${tokenId}`, {
      params: {
        chain: "ethereum",
        type: "sale",
      },
      headers: {
        Authorization: `${NFTPORT_API_KEY}`,
      },
    });
  } catch (err) {
    res.status(503).json({ message: err.message });
    return;
  }
  const parsed_transactions = transactions.data.transactions.map((transaction) => {
    return {
      asset_type: transaction.price_details.asset_type,
      price: transaction.price_details.price,
      price_usd: transaction.price_details.price_usd,
      transaction_date: transaction.transaction_date,
    };
  });
  res.json(parsed_transactions);
};

export default (app) => {
  app.get("/api/product/:contractAddress/:tokenId", getOneProduct);
  app.get("/api/product/tx/:contractAddress/:tokenId", getOneTransaction);
};
