const mongoose = require("mongoose");
const { Schema } = mongoose;

const productModel = new Schema({
  name: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  discount: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: [String],
  },
  productType: {
    type: "String",
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("Product", productModel);
