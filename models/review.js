// Require mongoose
const mongoose = require("mongoose");

//Define Schema
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: "Game", required: false },
  sourceSite: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: String, required: true },
  link: { type: String, required: false },
});

//Virtual for review's URL
reviewSchema.virtual("url").get(function () {
  return `/review/${this._id}`;
});

// Create Model
const Review = mongoose.model("Review", reviewSchema);

// export model
module.exports = Review;
