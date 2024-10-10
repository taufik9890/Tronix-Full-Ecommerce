const Cart = require("../models/cartModel");

exports.addToCartController = async (req, res) => {
  const { productId, userId, quantity } = req.body;
  try {
    const existingCart = await Cart.findOne({
      productId: productId,
      userId: userId,
    });

    if (existingCart) {
      if (req.query.type === "plus") {
        await Cart.findByIdAndUpdate(
          { _id: existingCart._id },
          { quantity: existingCart.quantity + 1 }
        );
      } else {
        if (existingCart.quantity > 1) {
          await Cart.findByIdAndUpdate(
            { _id: existingCart._id },
            { quantity: existingCart.quantity - 1 }
          );
        } else {
          await Cart.findByIdAndDelete({ _id: existingCart._id });
          return res.send("items deleted");
        }
      }
      return res.send("item updated");
    } else {
      let cart = new Cart({
        productId: productId,
        userId: userId,
        quantity: quantity ? quantity : 1,
      }).save();
      res.send("Item added");
    }
  } catch (err) {
    console.log(err.message);
  }
};

exports.getCartController = async (req, res) => {
  try {
    let cart = await Cart.find()
      .populate("productId")
      .populate("userId")
      .exec();
    res.send(cart);
  } catch (error) {
    console.log(error.message);
  }
};
