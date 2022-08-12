// Require Mongoose
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
});

//Virtual for genre's URL
GenreSchema.virtual("url").get(function () {
  return `/genre/${this._id}`;
});

//Export model
module.exports = mongoose.model("Genre", GenreSchema);
