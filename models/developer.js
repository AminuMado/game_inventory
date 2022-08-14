//Require mongoose
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const developerSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
  founded: { type: Number, required: true },
  summary: { type: String, required: true },
  logo: { type: String, required: false },
});

//Virtual property
developerSchema.virtual("url").get(function () {
  return `/developer/${this._id}`;
});

// Create Model
const Developer = mongoose.model("Developer", developerSchema);
//Export model
module.exports = Developer;
