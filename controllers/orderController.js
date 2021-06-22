import { Order } from "../models/order.js";
import { Cart } from "../models/cart.js";
import { User } from "../models/user.js";
import * as creds from "../config/creds.json";
import Stripe from "stripe";

const stripe = new Stripe(creds.stripeApiKey);

export async function getOrder(req, res) {
  const userId = req.params.id;
  Order.find({ userId })
    .sort({ createdAt: -1 })
    .then((orders) => res.status(200).send({ orders: orders }));
}
export async function checkout(req, res) {
  try {
    const userId = req.params.id;
    const { source } = req.body;
    let cart = Cart.findOne({ userId });
    let user = User.findOne({ _id: userId });
    const userEmail = user.email;

    if (cart) {
      const charge = stripe.charges.create({
        amount: cart.totalPrice,
        currency: "inr",
        source: source,
        receipt_email: userEmail,
      });

      if (!charge) {
        res.status(500).send({ error: "Payment failed!!" });
      } else {
        const order = Order.create({
          userId: userId,
          products: cart.products,
          bill: cart.totalPrice,
        });

        const cartDelete = Cart.findByIdAndDelete({ _id: cart.id });
        res.status(200).send({ order: order });
      }
    } else {
      res.status(500).send({ error: "No products in cart." });
    }
  } catch (error) {
    console.log("Checkout error ---" + error);
    res.status(500).send({ error: "Something went wrong" });
  }
}

// export { getOrder, checkout };
