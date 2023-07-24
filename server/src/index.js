import express from "express";
import corse from "cors";
import mongoose from "mongoose";
import env from "dotenv";
import { receipeRouter } from "./routes/receipe.js";
import { userRouter } from "./routes/user.js";

const secret = env.config();

mongoose.connect(
  `mongodb+srv://hashir90:HASHIR12345@receipe.tidynxv.mongodb.net/`
);

const app = express();
app.use(express.json());
app.use(corse());

app.use("/auth", userRouter);
app.use("/receipes", receipeRouter);

app.listen("3001", () => {
  console.log("SERVER RUNNING");
});
