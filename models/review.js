// Require mongoose
const mongoose = require("mongoose");

//Define Schema
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: "Game", required: true },
  sourceSite: { type: String, required: true },
  content: { type: String, required: false },
  rating: { type: String, required: true },
  link: { type: String, required: false },
});

//Virtual for review's URL
ReviewSchema.virtual("url").get(function () {
  return `/review/${this._id}`;
});

// export
module.exports = mongoose.model("Review", ReviewSchema);
