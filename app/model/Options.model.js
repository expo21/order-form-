const mongoose = require("mongoose");

const OptionSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    style_option: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Style_options",
    },
    input_type: { type: String },
    image: { type: String },
    garment_type: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Garment_Type" },
    ],
    status: { type: Number }, // 1 for active , 0 for inactive
    deleted: { type: Boolean, default: false },
  },
  {
    collection: "Options",
    timestamps: true,
  }
);

module.exports = mongoose.model("Options", OptionSchema);
