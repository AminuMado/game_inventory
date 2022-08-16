// Require mongoose
const mongoose = require("mongoose");

// Define a Schema
const Schema = mongoose.Schema;

const platformSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 2 },
  icon: { type: String, required: false },
});

//Virtual for platform's URL
platformSchema.virtual("url").get(function () {
  return `/platform/${this._id}`;
});

// Create Model
const Platform = mongoose.model("Platform", platformSchema);

//Export model
module.exports = Platform;
