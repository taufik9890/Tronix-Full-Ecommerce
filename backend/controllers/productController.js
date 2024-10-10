const Product = require("../models/productModel");
const FlashSale = require("../models/flashSaleModel");

exports.addProductController = async (req, res) => {
  const { name, slug, description, categoryId, price, discount, productType } =
    req.body;

  try {
    let arr = [];
    req.files.map((item) => {
      arr.push(`/uploads/${item.filename}`);
    });

    const product = new Product({
      name: name,
      slug: slug,
      description: description,
      image: arr,
      categoryId: categoryId,
      price: price,
      discount: discount,
      productType: productType,
    });
    product.save();

    res.send({ success: "Product is created" });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.viewProductController = async (req, res) => {
  const productData = await Product.find();
  res.send(productData);
};

exports.singleProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(slug);

    let data = await Product.find({ slug: slug });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

exports.flashSaleController = async (req, res) => {
  const { time, idList } = req.body;

  try {
    const existing = await FlashSale.find({ time: time });

    if (existing.length > 0) {
      await FlashSale.findByIdAndUpdate(
        { _id: existing[0]._id },
        { time: time }
      );
    } else {
      let data = new FlashSale({
        time: time,
        idList: idList,
      }).save();
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.getFlashSaleTimeController = async (req, res) => {
  try {
    let data = await FlashSale.find();
    res.send(data);
  } catch (error) {
    console.log(error.message);
  }
};
