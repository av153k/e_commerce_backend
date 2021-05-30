import mongoose from "mongoose";
const schema = mongoose.Schema;

const cartSchema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: "user",
  },
  products: [
    {
      id: {
        type: String,
      },
      name: { type: String },
      quantity: {
        type: Number,
        min: [1, "Quantity can not be less than 1"],
        default: 1,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Cart = mongoose.model("cart", cartSchema);
export { Cart };