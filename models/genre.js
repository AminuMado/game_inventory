// Require Mongoose
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const genreSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
});

//Virtual for genre's URL
genreSchema.virtual("url").get(function () {
  return `/genre/${this._id}`;
});

//Create model
const Genre = mongoose.model("Genre", genreSchema);

// Export Model
module.exports = Genre;
