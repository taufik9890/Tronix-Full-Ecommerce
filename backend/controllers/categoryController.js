const Category = require("../models/categoryModel");

// category controllers

exports.addCategoryController = async (req, res) => {
  const { name } = req.body;
  const existingCategory = await Category.find({ name: name.toLowerCase() });

  if (existingCategory.length > 0) {
    res.send({ error: "Category already exists" });
  } else {
    const category = new Category({
      name: name.toLowerCase(),
      image: `/uploads/${req.file.filename}`,
    });
    category.save();
    res.send({ success: "Category added successful" });
  }
};

exports.approveCategoryController = async (req, res) => {
  const { id, status } = req.body;
  try {
    const updateCategory = await Category.findOneAndUpdate(
      { _id: id },
      { status: status === "waiting" ? "approved" : "waiting" },
      { new: true }
    );

    res.send("Updated");
  } catch (error) {
    console.log(error);
  }
};

exports.viewCategoryController = async (req, res) => {
  const categoryData = await Category.find();
  res.send(categoryData);
};

exports.deleteCategoryController = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Category.findOneAndDelete({ _id: id });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

exports.editCategoryController = async (req, res) => {
  try {
    const { name, oldname } = req.body;
    const existingCategory = await Category.find({
      name: name.toLowerCase().trim(),
    });

    if (existingCategory.length > 0) {
      return res.send("Category already exist");
    } else {
      let category = await Category.findOneAndUpdate(
        { name: oldname },
        { name: name.toLowerCase() },
        { new: true }
      );
      res.send({ success: "Category updated" });
    }
  } catch (error) {
    res.send(error.message);
  }
};
