import express from "express";
import { ReceipeModel } from "../models/receipe.js";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";
import { verify } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await ReceipeModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", verify, async (req, res) => {
  const receipe = new ReceipeModel(req.body);
  try {
    const response = await receipe.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put("/", verify, async (req, res) => {
  try {
    const receipe = await ReceipeModel.findById(req.body.receipeId);

    const user = await UserModel.findById(req.body.userId);
    user.savedReceipes.push(receipe);
    await user.save();
    res.json({ savedReceipes: user.savedReceipes });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedreceipes/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.json({ savedRecipes: user?.savedReceipes });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedreceipes/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedReceipes = await ReceipeModel.find({
      _id: { $in: user.savedReceipes },
    });
    res.json({ savedReceipes });
  } catch (err) {
    res.json(err);
  }
});

export { router as receipeRouter };
