import {Product} from "../models/product";
import {Cart} from "../models/cart";
import { Request, Response } from "express";

export async function getCart (req: Request, res: Response)  {
  const userId = req.params.userId;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart && cart.products.length > 0) {
      res.status(200).send({ cart: cart });
    } else {
      res.status(404).send({ error: "Cart not found" });
    }
  } catch (error) {
    console.log("Getting cart error --" + error);
    res.status(500).send({ error: error });
  }
};

 export async function updateCartProduct(req: Request, res: Response)  {
  const userId = req.params.userId;
   const productId: string = req.body.productId;
   const productQuantity: number = req.body.productQuantity;
  try {
    let cart = await Cart.findOne({ userId });
    let product = await Product.findOne({ productId });
    if (!product) {
      res.status(404).send({ error: "Item not found" });
    }

    const productPrice: number = product!.price;
    const productName: string = product!.title;

    if (cart) {
      let productIndex = cart.products.findIndex((p) => p.id == productId);

      if (productIndex > -1) {
        let existingProduct = cart.products[productIndex];
        existingProduct.quantity += productQuantity;
        cart.products[productIndex] = existingProduct;
      } else {
        cart.products.push({
          id: productId,
          name: productName,
          quantity: productQuantity,
          price: productPrice,
        });
      }
      cart.totalPrice += productQuantity * productPrice;
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

 export async function deleteCartProduct(req: Request, res: Response)  {
  const userId = req.params.userId;
  const productId = req.params.productId;

  try {
    let cart = await Cart.findOne({ userId });
    let productIndex = cart!.products.findIndex((p) => p.id == productId);
    if (productIndex > -1) {
      let existingProduct = cart!.products[productIndex];
      cart!.totalPrice -= existingProduct.quantity * existingProduct.price;
      cart!.products.splice(productIndex, 1);
    }
    cart = await cart!.save();
    res.status(200).send({ cart: cart });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

// export { getCart, updateCartProduct, deleteCartProduct };
