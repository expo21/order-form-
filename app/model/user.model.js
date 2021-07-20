const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    userType: { type: Number, default: 2 }, // 2 for user , 1 for admin.
    status: { type: Number, default: 2 }, // 2 for pending, 1 for active, 0 for inactive
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = mongoose.model("users", UserSchema);
