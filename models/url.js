const mongoose = require("mongoose");
const path = require("path");
require(path.join(__dirname, "..", "db.js"));

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true,
  },
  count: {
    type: Number,
    value: 0,
  },
  redirectTo: {
    type: String,
    required: true,
  },
});

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;
