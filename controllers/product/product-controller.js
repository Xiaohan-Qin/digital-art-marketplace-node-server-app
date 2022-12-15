import axios from "axios";

const NFTPORT_API_KEY = process.env.NFTPORT_API_KEY;

/**
 * Example client request:
 * /api/product/0xe8be8b85a2ad7f29de32edbabb87efb109fa5b82/288
 * @param {*} req Client request with the contractAddress and tokenId as query params
 * @param {*} res Server response with the NFT data
 * @returns
 */
const getOneProduct = async (req, res) => {
  const { contractAddress, tokenId } = req.params;
  try {
    const response = await axios.get(`https://api.nftport.xyz/v0/nfts/${contractAddress}/${tokenId}`, {
      params: {
        chain: "ethereum",
      },
      headers: {
        Authorization: `${NFTPORT_API_KEY}`,
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    });
    const nft = response.data.nft;
    res.json({
      name: nft.metadata.name,
      contractAddress: contractAddress,
      tokenId: nft.token_id,
      chain: "Ethereum",
      tokenStandard: "ERC-721",
      description: nft.metadata.description,
      image: nft.cached_file_url,
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
  let response;
  try {
    response = await axios.get(`https://api.nftport.xyz/v0/transactions/nfts/${contractAddress}/${tokenId}`, {
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
  const parsed_transactions = response.data.transactions.map((transaction) => {
    return {
      assetType: transaction.price_details.asset_type,
      price: transaction.price_details.price,
      priceUsd: transaction.price_details.price_usd,
      transactionDate: transaction.transaction_date,
    };
  });
  res.json(parsed_transactions);
};

export default (app) => {
  app.get("/api/product/:contractAddress/:tokenId", getOneProduct);
  app.get("/api/product/tx/:contractAddress/:tokenId", getOneTransaction);
};
