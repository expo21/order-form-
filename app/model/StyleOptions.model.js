const mongoose = require("mongoose");

const StyleOptionSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    options: [{ type: mongoose.Schema.Types.ObjectId, ref: "Options" }],
    garment_type: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Garment_Type" },
    ],
    status: { type: Number }, // 1 for active , 0 for inactive
    custom: { type: Number }, // 1 for custom , 0 for not
  },
  {
    collection: "Style_options",
    timestamps: true,
  }
);

module.exports = mongoose.model("Style_options", StyleOptionSchema);
