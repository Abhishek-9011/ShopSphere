import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import { connectDb } from "./config/connectDb.js";
const app = express();
app.use(express.json());
app.use(cors());
connectDb();
app.use("/api/v1/user", userRouter);

app.listen(3000, () => console.log(`Server running on port 3000`));
