import mongoose from "mongoose";

const receipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },

  instructions: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
});

export const ReceipeModel = mongoose.model("receipes", receipeSchema);
