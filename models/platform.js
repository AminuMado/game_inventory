// Require mongoose
const mongoose = require("mongoose");

// Define a Schema
const Schema = mongoose.Schema;

const PlatformSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
  icon: { type: String, required: false },
});

//Virtual for platform's URL
PlatformSchema.virtual("url").get(function () {
  return `/platform/${this._id}`;
});

//Export model
module.exports = mongoose.model("Platform", PlatformSchema);
