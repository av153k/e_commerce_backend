import mongoose from "mongoose";
const schema = mongoose.Schema;

interface CartInerface extends mongoose.Document {
  userId: string;
  products: [
    {
      id: string;
      name: string;
      quantity: number;
      price: number;
    }
  ];
  totalPrice: number;
}

const cartSchema = new schema({
  userId: {
    type: String,
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
      price: {
        type: Number,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
});



const Cart = mongoose.model<CartInerface>("cart", cartSchema);
export { Cart };
