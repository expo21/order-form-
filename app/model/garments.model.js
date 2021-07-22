const mongoose = require("mongoose");

const GarmentSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    gender: { type: String },
    status: { type: Number }, // 1 for active , 0 for inactive
    deleted: { type: Boolean, default: false }, // true for deleted
  },
  {
    collection: "Garment_Type",
    timestamps: true,
  }
);

module.exports = mongoose.model("Garment_Type", GarmentSchema);
