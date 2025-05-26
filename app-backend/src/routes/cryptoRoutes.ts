import express from "express";
import {
  getCryptoList,
  searchCrypto,
  getCryptoDetails,
} from "../controllers/cryptoController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/list", protect, getCryptoList);
router.get("/search", protect, searchCrypto);
router.get("/details/:id", protect, getCryptoDetails);

export default router;
