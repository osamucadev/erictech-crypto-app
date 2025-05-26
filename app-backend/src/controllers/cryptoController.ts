import axios from "axios";
import { Request, Response } from "express";

const COINGECKO_API = "https://api.coingecko.com/api/v3";

export const getCryptoList = async (req: Request, res: Response) => {
  try {
    const { page = 1, per_page = 10 } = req.query;
    const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
      params: {
        vs_currency: "usd",
        page,
        per_page,
        sparkline: false,
      },
    });
    res.json(response.data);
  } catch (error) {
    const parsedError = error as { message: string };
    res.status(500).json({ message: parsedError.message });
  }
};

export const searchCrypto = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      res
        .status(400)
        .json({ message: "Query parameter is required and must be a string" });
      return;
    }

    const response = await axios.get(`${COINGECKO_API}/search`, {
      params: {
        query: query.toString(),
      },
    });

    const simplifiedResults = response.data.coins.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      marketCapRank: coin.market_cap_rank,
      thumb: coin.thumb,
      large: coin.large,
    }));

    res.json(simplifiedResults);
  } catch (error) {
    const parsedError = error as { message: string };
    res.status(500).json({ message: parsedError.message });
  }
};

export const getCryptoDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${COINGECKO_API}/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });
    res.json(response.data);
  } catch (error) {
    const parsedError = error as { message: string };
    res.status(500).json({ message: parsedError.message });
  }
};
