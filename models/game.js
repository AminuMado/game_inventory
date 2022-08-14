//Requre mongoose
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: { type: string, required: true, maxLength: 100, minLength: 3 },
  pictures: [{ type: string, required: false }],
  releaseDate: {
    type: Number,
    required: true,
    min: [1958, "Really? Earlier than Tennis for Two?"],
    max: 2099,
  },
  director: { type: String, required: true },
  summary: { type: String, required: false },
  platform: [{ type: Schema.Types.ObjectId, ref: "Platform", required: true }],
  developer: { type: Schema.Types.ObjectId, ref: "Developer", required: true },
  genre: { type: Schema.Types.ObjectId, ref: "Genre", required: false },
});

//Virtual for game's URL
GameSchema.virtual("url").get(function () {
  return `/game/${this._id}`;
});

//Export model
module.exports = mongoose.model("Game", GameSchema);
