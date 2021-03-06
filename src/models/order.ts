import mongoose from "mongoose";
const schema = mongoose.Schema;

interface OrderInteface extends mongoose.Document {
  userId: string;
  products: [{ id: string; name: string; quantity: number; price: number }];
  bill: number;
  createdAt: Date;
}

const orderSchema = new schema({
  userId: {
    type: String,
  },
  products: [
    {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
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
  bill: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model<OrderInteface>("order", orderSchema);
export { Order };
