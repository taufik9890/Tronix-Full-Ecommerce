const mongoose = require("mongoose");
const { Schema } = mongoose;

const subCategorySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["approve", "waiting", "reject"],
    default: "waiting",
  },
  image: {
    type: String,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("Subcategory", subCategorySchema);
