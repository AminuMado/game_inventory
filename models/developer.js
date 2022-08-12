//Require mongoose
const mongoose = require("mongoose");
//Define a schema
const Schema = mongoose.Schema;

const DeveloperSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 3 },
  founded: { type: Number, required: true },
  summary: { type: String, required: true },
  logo: { type: String, required: false },
});

//Virtual property
DeveloperSchema.virtual("url").get(function () {
  return `/developer/${this._id}`;
});

//Export model
module.exports = mongoose.model("Developer", DeveloperSchema);
