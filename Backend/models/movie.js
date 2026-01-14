import mongoose, { Schema } from "mongoose";
import User from "./User.js";

const movieSchema = new Schema(
  {
    name: { type: String, required: true},
    synopsis:{type: String},
    description: { type: String, required: true },
    date: { type: Number },
    director: { type: String },
    trailer: { type: String },
    imageCarousel: { type: String },
    imagePoster: { type: String },
    list: { type: Schema.Types.ObjectId, ref: "List", default: null }, 
    owner: { type: Schema.Types.ObjectId, ref: "User", default: null },
    isTemplate: { type: Boolean, default: false },
    whereToFind: {
      netflix: { available: Boolean, link: String },
      prime: { available: Boolean, link: String },
      disney: { available: Boolean, link: String },
      hbo: { available: Boolean, link: String },
      apple: { available: Boolean, link: String },
    },
  },
  { timestamps: true }
);
movieSchema.index({ name: 1, isTemplate: 1, owner: 1, list:1 }, { unique: true });

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
