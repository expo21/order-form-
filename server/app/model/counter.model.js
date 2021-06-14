const mongoose = require("mongoose");

const counterSchema = mongoose.Schema({
  _id: { type: String },
  sequence_value: { type: Number, default: 10000 },
});

module.exports = mongoose.model("counter", counterSchema);
