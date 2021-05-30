import Product from "../models/product";
import Cart from "../models/cart";

getCart = async (req, res) => {
  const userId = req.params.id;
  try {
    let cart = Cart.findOne({ userId });
    if (cart && cart.items.length > 0) {
      res.send(cart);
    } else {
      res.send(null);
    }
  } catch (error) {
    console.log("Getting cart error --" + error);
    res.status(500).send("Something went wrong.");
  }
};

updateCart = async (req, res) => {

}

deleteCartProduct = async (req, res) => {
  
}
