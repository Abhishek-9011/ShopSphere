import express from "express";
import sellerMiddleware from "../middleware/sellerMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
const router = express.Router();
router.post("/products", sellerMiddleware, createProduct);
router.get("/products", sellerMiddleware, getProducts);
router.put("/products/:id", sellerMiddleware, updateProduct);
router.delete("/products/:id", sellerMiddleware, deleteProduct);
export default router;
