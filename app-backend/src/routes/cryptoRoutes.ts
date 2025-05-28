import express from "express";
import {
  getCryptoList,
  searchCrypto,
  getCryptoDetails,
} from "../controllers/cryptoController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /api/crypto/list:
 *   get:
 *     summary: Get paginated list of cryptocurrencies
 *     tags: [Cryptocurrencies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: per_page
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of cryptocurrencies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CryptoCoin'
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Internal server error
 */
router.get("/list", protect, getCryptoList);

/**
 * @swagger
 * /api/crypto/search:
 *   get:
 *     summary: Search for cryptocurrencies
 *     tags: [Cryptocurrencies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search term for cryptocurrencies
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CryptoSearchResult'
 *       400:
 *         description: Bad request (missing query parameter)
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Internal server error
 */
router.get("/search", protect, searchCrypto);

/**
 * @swagger
 * /api/crypto/details/{id}:
 *   get:
 *     summary: Get detailed information about a cryptocurrency
 *     tags: [Cryptocurrencies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Cryptocurrency ID (e.g., bitcoin)
 *     responses:
 *       200:
 *         description: Detailed cryptocurrency information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CryptoDetails'
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Internal server error
 */
router.get("/details/:id", protect, getCryptoDetails);

export default router;
