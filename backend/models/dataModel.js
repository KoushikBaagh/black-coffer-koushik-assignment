const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  intensity: Number,
  likelihood: Number,
  relevance: Number,
  year: Number,
  country: String,
  topics: [String],
  region: String,
  city: String,
  // Add any other fields from your JSON data
});

const dataModel = mongoose.model("Data", dataSchema);

module.exports = dataModel;
