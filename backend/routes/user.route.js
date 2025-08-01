import express from "express";
import { signin, signup } from "../controllers/auth.controller.js";
import { getUser, updateUser } from "../controllers/user.controller.js";
import userMiddleware from "../middleware/userMiddleware.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", userMiddleware, getUser);
router.put("/profile", userMiddleware, updateUser);
export default router;
