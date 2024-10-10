const SubCategory = require("../models/subCategoryModel");

exports.addSubCategoryController = async (req, res) => {
  const { name, categoryId } = req.body;
  try {
    if (!name || !categoryId) {
      return res.send({ error: "Category must be select" });
    }
    const existingCategory = await SubCategory.find({
      name: name.toLowerCase(),
    });

    if (existingCategory.length > 0) {
      res.send({ error: "SubCategory already exists" });
    } else {
      const category = new SubCategory({
        name: name.toLowerCase(),
        image: `/uploads/${req.file.filename}`,
        categoryId: categoryId,
      });
      category.save();
      res.send({ success: "SubCategory added successful" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.viewSubCategoryController = async (req, res) => {
  const allSubCategory = await SubCategory.find().populate("categoryId");
  res.send(allSubCategory);
};

exports.approveSubCategoryController = async (req, res) => {
  const { id, status } = req.body;
  try {
    const updateSubCategory = await SubCategory.findOneAndUpdate(
      { _id: id },
      { status: status === "waiting" ? "approved" : "waiting" },
      { new: true }
    );

    res.send("Updated");
  } catch (error) {
    console.log(error);
  }
};

exports.deleteSubCategoryController = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await SubCategory.findOneAndDelete({ _id: id });
    res.send("Subcategory deleted");
  } catch (error) {
    console.log(error);
  }
};

exports.singleSubCategoryController = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await SubCategory.find({ categoryId: id });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};
