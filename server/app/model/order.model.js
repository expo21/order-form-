const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    order_number: { type: String },
    name: { type: String },
    email: { type: String },
    address: { type: String },
    tel: { type: String },
    gender: { type: String },
    garment_type: { type: String },
    choose_style: { type: String },
    custom: { type: Object },
    fabric: { type: String },
    fitting: { type: String },
    measurements: { type: Object },
    status: { type: String },
    booking: { type: String },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", OrderSchema);
