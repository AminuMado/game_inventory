// Require mongoose
const mongoose = require("mongoose");

//Define Schema
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: "Game", required: true },
  sourceSite: { type: String, required: true },
  snippet: { type: String, required: true },
  rating: { type: String, required: true },
  link: { type: String, required: true },
});

//Virtual for review's URL
reviewSchema.virtual("url").get(function () {
  return `/review/${this._id}`;
});

// Create Model
const Review = mongoose.model("Review", reviewSchema);

// export model
module.exports = Review;
