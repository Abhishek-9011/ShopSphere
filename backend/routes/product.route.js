import express from "express";
import sellerMiddleware from "../middleware/sellerMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
const router = express.Router();
router.post("/", sellerMiddleware, createProduct);
router.get("/", getProducts);
router.put("/:id", sellerMiddleware, updateProduct);
router.delete("/:id", sellerMiddleware, deleteProduct);
export default router;
