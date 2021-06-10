import Product from "../models/product";
import Cart from "../models/cart";

getCart = async (req, res) => {
  const userId = req.params.userId;
  try {
    let cart = Cart.findOne({ userId });
    if (cart && cart.items.length > 0) {
      res.send(cart);
    } else {
      res.send(null);
    }
  } catch (error) {
    console.log("Getting cart error --" + error);
    res.status(500).send({ error: error });
  }
};

updateCartProduct = async (req, res) => {
  const userId = req.params.userId;
  const { productId, productQuantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    let product = await Product.findOne({ productId });
    if (!product) {
      res.status(404).send({ error: "Item not found" });
    }

    const productPrice = product.productPrice;
    const productName = product.productName;

    if (cart) {
      let productIndex = cart.products.findIndex((p) => p.id == productId);

      if (productIndex > -1) {
        let existingProduct = cart.products[productIndex];
        existingProduct.quantity += productQuantity;
        cart.products[productIndex] = existingProduct;
      } else {
        cart.products.push({
          productId,
          productName,
          productQuantity,
          productPrice,
        });
      }
      cart.totalproductPrice += productQuantity * productPrice;
      cart = await cart.save();
      return res.status(200).send({ cart: cart });
    } else {
      const newCart = await Cart.create({
        userId,
        products: [{ productId, productName, productQuantity, productPrice }],
        totalproductPrice: productQuantity * productPrice,
      });
      res.status(200).send({ cart: newCart });
    }
  } catch (error) {
    console.log("Updating cart error ---" + error);
    res.status(500).send({ error: error });
  }
};

deleteCartProduct = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  try {
    let cart = await Cart.findOne({ userId });
    let productIndex = await Cart.products.findIndex((p) => p.id == productId);
    if (productIndex > -1) {
      let existingProduct = cart.products[productIndex];
      cart.totalPrice -= existingProduct.quantity * existingProduct.price;
      cart.products.splice(productIndex, 1);
    }
    cart = await cart.save();
    res.status(200).send({ cart: cart });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

export { getCart, updateCartProduct, deleteCartProduct };
