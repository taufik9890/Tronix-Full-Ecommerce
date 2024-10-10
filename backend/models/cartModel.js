const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  quantity: {
    type: Number,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
