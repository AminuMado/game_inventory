//Requre mongoose
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: { type: String, maxLength: 100, minLength: 3, required: true },
  releaseDate: {
    type: Number,
    min: [1958, "Really? Earlier than Tennis for Two?"],
    max: 2099,
    required: true,
  },
  pictures: [{ type: String, required: false }],
  director: { type: String, required: true },
  summary: { type: String, required: true },
  platform: [{ type: Schema.Types.ObjectId, ref: "Platform", required: false }],
  developer: { type: Schema.Types.ObjectId, ref: "Developer", required: false },
  genre: { type: Schema.Types.ObjectId, ref: "Genre", required: false },
});

//Virtual for game's URL
gameSchema.virtual("url").get(function () {
  return `/game/${this._id}`;
});

// Create a model
const Game = mongoose.model("Game", gameSchema);

//Export model
module.exports = Game;
