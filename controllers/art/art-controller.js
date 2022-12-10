import axios from "axios";

const NFTPORT_API_KEY = process.env.NFTPORT_API_KEY;

const getTest = async (req, res) => {
  res.json({ message: "Hello from art controller" });
};

/**
 * Example request:
 * /api/art/tx?contractAddress=0xe8be8b85a2ad7f29de32edbabb87efb109fa5b82&tokenId=288
 * @param {*} req The request from the client with the contractAddress and tokenId as query params
 * @param {*} res The response to the client with the sale history data
 */
const getArtTransactions = async (req, res) => {
  const { contractAddress, tokenId } = req.query;
  await axios
    .get(`https://api.nftport.xyz/v0/transactions/nfts/${contractAddress}/${tokenId}`, {
      params: {
        chain: "ethereum",
        type: "sale",
      },
      headers: {
        Authorization: `${NFTPORT_API_KEY}`,
      },
    })
    .then((response) => {
      res.json(response.data);
    });
};

export default (app) => {
  app.get("/api/art/test", getTest);
  app.get("/api/art/tx", getArtTransactions);
};
